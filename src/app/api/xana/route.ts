import { NextRequest, NextResponse } from 'next/server';
import { prismadb } from '@/libs/prismadb';
import { validDate } from '@/libs/regExp';

interface XanaPros {
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

interface PriceData {
  id: number;
  new_code: string;
  product_name: string;
  product_brand: string;
  product_presentation: string;
  product_units: number;
  date: string;
  mercado: string;
  market_code: string;
  price: string;
  priceBs: string;
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
  let inputDate: Date = new Date();

  let xanaData: XanaPros = {
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

      xanaData.barcodeCM = xanaProduct?.barcode || null;
      xanaData.codeCM = xanaProduct?.CM_Code || null;
      xanaData.nameCM = xanaProduct?.name || null;
    }

    if (date) {
      inputDate = new Date(date);
    }

    pricesQuery = await prismadb.price_far_bs.findMany({
      where: {
        ...(date && { date: inputDate }),
        ...(xanaData.codeCM && { new_code: xanaData.codeCM }),
      },
    });

    const summarizedData = groupAndCalculate(pricesQuery);

    const xanaPrice = pricesQuery.find(
      (item: PriceData) => item.mercado === 'Xana'
    );

    return NextResponse.json({
      status: 200,
      quantities: pricesQuery.length,
      date,
      barcode: xanaData.barcodeCM,
      code: xanaData.codeCM,
      name: xanaData.nameCM,
      precioXana: xanaPrice.price,
      precioXanaBs: xanaPrice.priceBs,
      precioMin: summarizedData[0].priceMin,
      precioMinBs: summarizedData[0].priceMinBs,
      precioMax: summarizedData[0].priceMax,
      precioMaxBs: summarizedData[0].priceMaxBs,
      precioAvg: summarizedData[0].priceAvg,
      precioAvgBs: summarizedData[0].priceAvgBs,
      pricesQuery,
    });
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
