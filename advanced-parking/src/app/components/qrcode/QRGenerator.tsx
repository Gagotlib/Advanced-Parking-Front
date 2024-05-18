import React from 'react'
import QRCode from 'qrcode.react';

function QRGenerator() {

  const url = 'https://advanced-parking.vercel.app/';

  return (
    <div>
      <QRCode
        value={url}
        size={220}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"Q"} // Niveles: L, M, Q, H (de menor a mayor corrección de errores)
        includeMargin={true}
      />
    </div>
  )
}

export default QRGenerator