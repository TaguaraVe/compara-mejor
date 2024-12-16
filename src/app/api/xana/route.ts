import { NextRequest, NextResponse } from 'next/server';
import { prismadb } from '@/libs/prismadb';
import { validDate } from '@/libs/regExp';

// Funcion que calcula el precio promedio para cada producto del array
// function groupAndCalculate(data: DataItem[]): GroupedDataItem[] {
//   const groupedData: {
//     [key: string]: {
//       new_code: string;
//       date: string | Date;
//       price: number[];
//       priceBs: number[];
//     };
//   } = {};

//   data.forEach((item) => {
//     const key = `${item.new_code}-${item.date}`;
//     if (!groupedData[key]) {
//       groupedData[key] = {
//         new_code: item.new_code,
//         date: item.date,
//         price: [item.price],
//         priceBs: [item.priceBs],
//       };
//     } else {
//       groupedData[key].price.push(item.price);
//       groupedData[key].priceBs.push(item.priceBs);
//     }
//   });

//   return Object.values(groupedData).map((group) => {
//     const { new_code, date, price, priceBs } = group;
//     const priceMax = Math.max(...price);
//     const priceMaxBs = Math.max(...priceBs);
//     const priceMin = Math.min(...price);
//     const priceMinBs = Math.min(...priceBs);

//     const priceAvg =
//       price.reduce((sum, price) => sum + price * 1, 0) / price.length;

//     const priceAvgBs =
//       priceBs.reduce((sum, price) => sum + price * 1, 0) / priceBs.length;
//     return {
//       new_code,
//       date,
//       priceMax,
//       priceMin,
//       priceAvg,
//       priceAvgBs,
//       priceMaxBs,
//       priceMinBs,
//     };
//   });
// }

// ===================================================================
// ===================================================================
function groupAndCalculate(
  data: PriceData[],
  barcode?: string,
  xanaTable?: Producto[]
): GroupedDataItem[] {
  const groupedMap = new Map<string, GroupedDataItem>();

  data.forEach((item) => {
    const key = `${item.new_code}|${item.date}`;

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        date: item.date,
        new_code: item.new_code,
        barcode: barcode || undefined,
        product_name: item.product_name,
        product_brand: item.product_brand,
        product_presentation: item.product_presentation,
        product_units: item.product_units,
        priceXana: 0,
        priceMax: -Infinity,
        priceMin: Infinity,
        priceAvg: 0,
        priceXanaBs: 0,
        priceAvgBs: 0,
        priceMaxBs: -Infinity,
        priceMinBs: Infinity,
        details: [],
      });
    }

    const group = groupedMap.get(key)!;

    // Update details
    group.details.push({
      mercado: item.mercado,
      price: item.price,
      priceBs: item.priceBs,
    });

    // Update Xana prices if mercado is Xana
    if (item.mercado === 'Xana') {
      group.priceXana = item.price;
      group.priceXanaBs = item.priceBs;
    }

    // Update min, max, and average calculations
    group.priceMax = Math.max(group.priceMax, item.price);
    group.priceMin = Math.min(group.priceMin, item.price);
    group.priceMaxBs = Math.max(group.priceMaxBs, item.priceBs);
    group.priceMinBs = Math.min(group.priceMinBs, item.priceBs);

    // Update cumulative sum for averages
    group.priceAvg += item.price;
    group.priceAvgBs += item.priceBs;
  });

  // Add barcode from Xana table if not provided
  if (!barcode && xanaTable) {
    groupedMap.forEach((group) => {
      const xanaItem = xanaTable.find((x) => x.new_code === group.new_code);
      if (xanaItem) {
        group.barcode = xanaItem.barcode;
      }
    });
  }

  // Calculate averages
  const result: GroupedDataItem[] = [];
  groupedMap.forEach((group) => {
    const itemCount = group.details.length;
    group.priceAvg = parseFloat((group.priceAvg / itemCount).toFixed(2));
    group.priceAvgBs = parseFloat((group.priceAvgBs / itemCount).toFixed(2));
    result.push(group);
  });

  return result;
}

// ===================================================================
// ===================================================================

// Funcion que combina dos arreglos, incluye el codigo de barra del array 1, en el array 2
interface Producto {
  CM_Code: string;
  barcode: string;
  name: string;
}

function combinarArrays(
  productos: Producto[],
  datos: PriceData[]
): PriceData[] {
  const mapProductos = new Map<string, string>();
  productos.forEach((producto) =>
    mapProductos.set(producto.CM_Code, producto.barcode)
  );

  return datos.map((dato) => ({
    ...dato,
    barcode: mapProductos.get(dato.new_code),
  }));
}

export async function GET(req: NextRequest) {
  let pricesQuery: PriceData[] = [];
  let datosCompletos: PriceData[] = [];
  let summarizedData: GroupedDataItem[] = [];
  let allXana: Producto[] = [];
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

    //  Query solo para una fecha, es decir no hay codigo de barra
    if (!barcode) {
      allXana = await prismadb.xana.findMany({
        select: { CM_Code: true, barcode: true, name: true },
      });

      pricesQuery = await prismadb.price_far_bs.findMany({
        where: {
          date: inputDate,
          new_code: {
            in: allXana.map((product) => product.CM_Code),
          },
        },
      });
      // datosCompletos = combinarArrays(allXana, pricesQuery);
    } else {
      pricesQuery = await prismadb.price_far_bs.findMany({
        where: {
          ...(date && { date: inputDate }),
          ...(xanaData.codeCM && { new_code: xanaData.codeCM }),
        },
      });
    }

    summarizedData = groupAndCalculate(pricesQuery, barcode, allXana);

    return NextResponse.json({
      status: 200,
      quantities: summarizedData.length,
      summarizedData,
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
