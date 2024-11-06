const exampleData = {
  "id": 1,
  "Folio": "EX-001",
  "Fecha": "2024-09-30T00:00:00.000Z",
  "Proveedor": "Proveedor Genérico S.A. de C.V.",
  "Proyecto": "Proyecto Ejemplo",
  "Contacto": "Juan Pérez",
  "Total_Sin_Iva": 500,
  "Nota": "Nota genérica sobre el proyecto",
  "Cotizacion": "COT-12345",
  "Referencia": {
    "Autorizada": "Autorización Ejemplo",
    "Condiciones_Comerciales": "Condiciones comerciales genéricas",
    "Contacto": {
      "Correo": "contacto@proveedor.com",
      "Empresa": {
        "tableId": "Proveedores",
        "rowId": 1
      },
      "Nombre_Contacto": "Juan Pérez",
      "Telefono": "1234-567-890",
      "id": 1
    },
    "Cotizacion": "COT-12345",
    "Descuento_Global": 50,
    "Direccion_De_Entrega": {
      "Contacto": "Persona de Contacto",
      "Domicilio": "Calle Falsa 123, Ciudad de Ejemplo, Estado, C.P. 12345",
      "Telefono": "9876-543-210",
      "id": 3
    },
    "Elaborado_Por": "Elaborador Ejemplo",
    "Empresa_Base": {
      "CP": "C.P. 12345",
      "Calle": "Calle Ejemplo",
      "Direccion": "Calle Ejemplo 123, Colonia Centro, Ciudad de Ejemplo, Estado",
      "Email": "info@empresa.com",
      "Estado": "Estado de Ejemplo",
      "Logo": "https://www.ejemplo.com/logo.png",
      "Nombre": "Empresa Ejemplo S.A. de C.V.",
      "RFC": "EJE123456789",
      "Saludo": "Apreciable cliente, nos complace enviarle la siguiente cotización.",
      "Telefono": "+52-123-456-7890",
      "Terminos_Y_Condiciones": "Tiempo de entrega estimado de 30 a 90 días hábiles después de recibir la orden de compra.",
      "Web": "www.empresa.com",
      "id": 1
    },
    "Fecha": "2024-09-30T00:00:00.000Z",
    "Folio": "EX-001",
    "Forma_De_Pago": "Transferencia Bancaria",
    "Items": [
      {
        "Cantidad": 10,
        "Descripcion": "Producto A - Ejemplo Descripción",
        "Descuento_por_Item": 10,
        "Modelo": "Modelo-A",
        "Orden_de_Compra": {
          "tableId": "Orden_De_Compra_Nacional",
          "rowId": 1
        },
        "Partida": 1,
        "Precio": 100,
        "Subtotal": 1000,
        "Total": 900,
        "Unidad_de_Medida": "unidad",
        "id": 1
      },
      {
        "Cantidad": 5,
        "Descripcion": "Producto B - Ejemplo Descripción",
        "Descuento_por_Item": 20,
        "Modelo": "Modelo-B",
        "Orden_de_Compra": {
          "tableId": "Orden_De_Compra_Nacional",
          "rowId": 1
        },
        "Partida": 2,
        "Precio": 50,
        "Subtotal": 250,
        "Total": 230,
        "Unidad_de_Medida": "unidad",
        "id": 2
      }
    ],
    "Metodo_De_Pago": "Pago en una sola exhibición",
    "Nota": "Nota genérica sobre la referencia",
    "Proveedor": {
      "Banco": "Banco Genérico",
      "Cuenta_Clabe": "123456789012345678",
      "Direccion": "Calle Proveedor 123, Ciudad de Ejemplo",
      "Empresa": "Proveedor Genérico S.A. de C.V.",
      "Id_Proveedor": "PROV-001",
      "Numero_De_Cuenta": "9876543210",
      "Razon_Social": "Proveedor Genérico S.A. de C.V.",
      "id": 1
    },
    "Proyecto": "Proyecto Ejemplo",
    "Total_Sin_Iva": 1130,
    "Uso_CFDI": "Gastos Generales",
    "id": 1
  },
  "Items": {
    "tableId": "Items_Orden_De_Compra_Nacional",
    "rowIds": [
      1,
      2
    ]
  }
};
