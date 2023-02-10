import React from 'react'
 
import PDFViewer from 'pdf-viewer-reactjs'
 
const Pdf = (data) => {
    console.log(data.data);
    return (
        <PDFViewer
            document={{
                url: data.data,
            }}
        />
    )
}
 
export default Pdf