import { NextRequest, NextResponse } from 'next/server';
import { prismadb } from '@/libs/prismadb';
import { validDate } from '@/libs/regExp';

interface XanitaPros {
  codeCM: string | null;
  barcodeCM: string | null;
  nameCM: string | null;
}

interface DataItem {
  id: number;
  new_code: string;
  product_name: string;
  product_brand: string;
  product_presentation: string;
  product_units: number;
  date: string;
  mercado: string;
  price: number;
  priceBs: number;
  tag_promo: string;
}

function groupAndCalculate(data: DataItem[]): {
  new_code: string;
  date: string;
  priceMaxBs: number;
  priceMinBs: number;
  priceAvgBs: number;
  priceMax: number;
  priceMin: number;
  priceAvg: number;
}[] {
  const groupedData: {
    [key: string]: {
      new_code: string;
      date: string;
      price: number[];
      priceBs: number[];
    };
  } = {};

  data.forEach((item) => {
    const key = `${item.new_code}-${item.date}`;
    if (!groupedData[key]) {
      groupedData[key] = {
        new_code: item.new_code,
        date: item.date,
        price: [item.price],
        priceBs: [item.priceBs],
      };
    } else {
      groupedData[key].price.push(item.price);
      groupedData[key].priceBs.push(item.priceBs);
    }
  });

  return Object.values(groupedData).map((group) => {
    const { new_code, date, price, priceBs } = group;
    const priceMax = Math.max(...price);
    const priceMaxBs = Math.max(...priceBs);
    const priceMin = Math.min(...price);
    const priceMinBs = Math.min(...priceBs);

    const priceAvg =
      price.reduce((sum, price) => sum + price * 1, 0) / price.length;
    console.log('array price', price, 'length', price.length, priceAvg);

    const priceAvgBs =
      priceBs.reduce((sum, price) => sum + price * 1, 0) / priceBs.length;
    return {
      new_code,
      date,
      priceMax,
      priceMin,
      priceAvg,
      priceAvgBs,
      priceMaxBs,
      priceMinBs,
    };
  });
}

export async function GET(req: NextRequest) {
  let pricesQuery: any = [];

  let xanita: XanitaPros = {
    codeCM: null,
    barcodeCM: null,
    nameCM: null,
  };

  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const barcode: any = searchParams.get('barcode');

    if (!date && !barcode) {
      return NextResponse.json({
        status: 400,
        msg: 'Debe indicar algun criterio de busqueda',
      });
    }

    if (!!date && !validDate(date)) {
      return NextResponse.json({
        status: 400,
        msg: 'Fecha Invalida',
        date: date,
      });
    }

    if (barcode) {
      const xanaProduct = await prismadb.xana.findFirst({
        where: {
          barcode,
        },
      });

      if (xanaProduct == null) {
        return NextResponse.json({
          status: 404,
          msg: 'El producto no esta en la lista de Xana',
        });
      }

      xanita.barcodeCM = xanaProduct?.barcode || null;
      xanita.codeCM = xanaProduct?.CM_Code || null;
      xanita.nameCM = xanaProduct?.name || null;
    }

    const inputDate = new Date(date);
    // if (date && barcode) {
    //   pricesQuery = await prismadb.price_far_bs.findMany({
    //     where: {
    //       date: inputDate,
    //       new_code: xanita.codeCM,
    //     },
    //   });
    // } else if (barcode) {
    //   pricesQuery = await prismadb.price_far_bs.findMany({
    //     where: {
    //       new_code: xanita.codeCM,
    //     },
    //   });
    // } else {
    //   pricesQuery = await prismadb.price_far_bs.findMany({
    //     where: {
    //       date: inputDate,
    //     },
    //   });
    // }
    // const allXana = await prismadb.xana.findMany({});
    // const pricesQuery = await prismadb.price_far_bs.findMany({
    //   where: {
    //     date: inputDate,
    //     new_code: {
    //       in: allXana.map((product) => product.CM_Code),
    //     },
    //   },
    // });

    // const pricesQuery = allXana.map((cod)=>{

    //    await prismadb.price_far_bs.findFirst({
    //     where: {
    //       date: inputDate,
    //       new_code: cod.CM_Code
    //     },

    // })

    pricesQuery = await prismadb.price_far_bs.findMany({
      where: {
        ...(date && { date: inputDate }),
        ...(xanita.codeCM && { new_code: xanita.codeCM }),
      },
    });

    const summarizedData = groupAndCalculate(pricesQuery);
    console.log(summarizedData);

    return NextResponse.json({
      status: 200,
      quantities: pricesQuery.length,
      date,
      xanita,
      pricesQuery,
      // allXana,
    });
    const data = 'Preparar Datos';
  } catch (error) {
    console.log('[GET PRICES]', error);
    return new NextResponse('Internal error', { status: 500 });
    // } finally {
    //   return NextResponse.json({
    //     status: 200,
    //     date,
    //     xanita,
    //     quantities: pricesQuery.length,
    //     pricesQuery,
    //   });
  }
}
