import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {printToFileAsync} from "expo-print"
import {shareAsync} from "expo-sharing"
import { useSelector } from 'react-redux';
const Pdf = (props) => {
  const {boleta} = props;

  let hoy = new Date()
  const html = 
                `<!DOCTYPE html>
                <html>
                <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                  }
                  .receipt {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 10px;
                  }
                  .title {
                    font-size: 20px;
                    font-weight: bold;
                  }
                  .company-title {
                    font-size: 18px;
                  }
                  .customer-title {
                    font-size: 16px;
                    text-align: left;
                  }
                  .date {
                    font-size: 12px;
                  }
                  .table {
                    width: 100%;
                    margin-top: 10px;
                  }
                  .table th{
                    padding: 5px;
                    border-top: 1px solid #000;
                    border-bottom: 1px solid #000;
                  }
                  .table td{
                    text-align: left;
                  }
                  .total {
                    border-top: 1px solid #000;
                    margin-top: 10px;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: right;
                  }
                </style>
                </head>
                <body>
                  <div class="receipt">
                    <div class="date">Descargado el: ${hoy.toLocaleString().slice(0, 10)}</div>
                    <br>
                    <div class="company-title">Belli's Panaderia</div>
                    <br>
                    <div class="title">Recibo de entregas</div>
                    <div class="customer-title">Cliente: ${boleta.cliente}</div>
                    <table class="table">
                      <tr>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Valor</th>
                      </tr>
                      ${boleta.registros.map(r=>{
                        return ` 
                        <tr>
                        <td>${r.fecha.toLocaleString().slice(0, 10)}</td>
                        <td>${r.producto}</td>
                        <td>${r.cantidad} ${r.tipoCantidad}</td>
                        <td>$${r.costo}</td>
                        </tr>
                        `
                      })}
                    </table>
                    <div class="total">Total: $${boleta.total + " "}  </div>
                  </div>
                </body>
                </html>`

  const generarPdf = async()=>{
    const file = await printToFileAsync({
      html: html,
      base64: false,
      type: 'pdf',
      filename: `boleta_${boleta.cliente}_${hoy.toLocaleString().slice(0, 10)}.pdf`,
    });
    await shareAsync(file.uri)
  }

  return (
    <View>
          <TouchableOpacity onPressOut={generarPdf} style={styles.buttonSecondary}>
            <Text style={styles.buttonText}> DESCARGAR⬇</Text>
          </TouchableOpacity>
    </View>
  );
};

const primaryColor = '#FF7F50'; // Color melocotón
const secondaryColor = '#5F9EA0'; // Color turquesa

const styles = StyleSheet.create({
  buttonSecondary: {
    backgroundColor: 'white',

    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'

  },
  buttonText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Pdf;
