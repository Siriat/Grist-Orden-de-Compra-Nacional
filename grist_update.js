function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function addDefaultValues(row) {
  // Add default values to ensure all fields have data
  if (!row.Items) {
    row.Items = [
      {
        Description: 'Default Item',
        Quantity: 1,
        Price: 100,
        Total: 100,
      },
    ];
  }
  if (!row.Total) {
    row.Total = row.Items.reduce((sum, item) => sum + (item.Price * item.Quantity), 0);
  }
  if (!row.Issued) {
    row.Issued = 'N/A';
  }
  if (!row.Due) {
    row.Due = 'N/A';
  }
  return row;
}

const data = {
  gristdata: '',
  status: 'waiting',
  tableConnected: false,
  rowConnected: false,
  haveRows: false,
};
let app = undefined;

Vue.filter('currency', formatNumberAsUSD)
function formatNumberAsUSD(value) {
  if (typeof value !== "number") {
    return value || '—';      // falsy value would be shown as a dash.
  }
  value = Math.round(value * 100) / 100;    // Round to nearest cent.
  value = (value === -0 ? 0 : value);       // Avoid negative zero.

  const result = value.toLocaleString('en', {
    style: 'currency', currency: 'USD'
  })
  if (result.includes('NaN')) {
    return value;
  }
  return result;
}

Vue.filter('fallback', function(value, str) {
  if (!value) {
    throw new Error("Please provide column " + str);
  }
  return value;
});

Vue.filter('asDate', function(value) {
  if (typeof(value) === 'number') {
    value = new Date(value * 1000);
  }
  const date = moment.utc(value);
  return date.isValid() ? date.format('YYYY-MM-DD') : value;
});

function tweakUrl(url) {
  if (!url) { return url; }
  if (url.toLowerCase().startsWith('http')) {
    return url;
  }
  return 'https://' + url;
};

function handleError(err) {
  console.error(err);
  const target = app || data;
  target.gristdata = '';
  target.status = String(err).replace(/^Error: /, '');
  console.log(data);
}

function prepareList(lst, order) {
  if (order) {
    let orderedLst = [];
    const remaining = new Set(lst);
    for (const key of order) {
      if (remaining.has(key)) {
        remaining.delete(key);
        orderedLst.push(key);
      }
    }
    lst = [...orderedLst].concat([...remaining].sort());
  } else {
    lst = [...lst].sort();
  }
  return lst;
}

function updateHtmlData(row) {
  try {
    data.status = '';
    if (row === null) {
      throw new Error("(No data - not on row - please add or select a row)");
    }
    console.log("GOT...", JSON.stringify(row));
    if (row.References) {
      try {
        Object.assign(row, row.References);
      } catch (err) {
        throw new Error('Could not understand References column. ' + err);
      }
    }

									  
	    // Calcular los totales requeridos
    if (row.Referencia.Items && Array.isArray(row.Referencia.Items)) {
      const subtotal = row.Referencia.Items.reduce((sum, item) => sum + (item.Subtotal || 0), 0);
      const descuentoTotal = row.Referencia.Items.reduce((sum, item) => sum + (item.Descuento_por_Item || 0), 0) + row.Referencia.Descuento_Global;
      const totalAntesDeImpuestos = subtotal - descuentoTotal;
      const iva = parseFloat((totalAntesDeImpuestos * 0.16).toFixed(2));
      const total = parseFloat((totalAntesDeImpuestos + iva).toFixed(2));

      row.PreciosTotales = {
        Subtotal: subtotal,
        DescuentoTotal: descuentoTotal,
        TotalAntesDeImpuestos: totalAntesDeImpuestos,
        IVA: iva,
        Total: total
      };
    }
	
	 

    // Verificar campos faltantes y sugerir referencias
    if (!row.Issued || !row.Due) {
      row.Help = {
        expected: ['Issued', 'Due'],
        missing: ['Issued', 'Due'].filter(field => !row[field]),
      };
    }

    // Ordenar y validar items si existen
    if (row.Items && Array.isArray(row.Items)) {
      row.Items.sort((a, b) => a.Description.localeCompare(b.Description));
      // Más validaciones pueden agregarse aquí
    }

    // Hacer gristdata disponible para depuración.
    data.gristdata = row;
    window.gristdata = row;
  } catch (err) {
    handleError(err);
  }
}

ready(function() {
  // Update the HTML data anytime the document data changes.
  grist.ready();
  grist.onRecord(updateHtmlData);

  // Monitor status so we can give user advice.
  grist.on('message', msg => {
    // If we are told about a table but not which row to access, check the
    // number of rows.  Currently if the table is empty, and "select by" is
    // not set, onRecord() will never be called.
    if (msg.tableId && !app.rowConnected) {
      grist.docApi.fetchSelectedTable().then(table => {
        if (table.id && table.id.length >= 1) {
          app.haveRows = true;
        }
      }).catch(e => console.log(e));
    }
    if (msg.tableId) { app.tableConnected = true; }
    if (msg.tableId && !msg.dataChange) { app.RowConnected = true; }
  });

  Vue.config.errorHandler = function (err, vm, info)  {
    handleError(err);
  };

  app = new Vue({
    el: '#app',
    data: data
  });

  // Force update with exampleData to verify if the data is being passed correctly
  if (document.location.search.includes('demo')) {
//    console.log('Loaded exampleData:', exampleData);
    updateHtmlData(exampleData);
  }

  //if (document.location.search.includes('labels')) {
  //  updateHtmlData({});
  //}
});
