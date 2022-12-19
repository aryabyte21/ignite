// // import { PDFDocument, PDFPage } from "react-native-pdf-lib"
// // import { RNCamera } from "react-native-camera"
// // import ImageCropPicker from "react-native-image-crop-picker"
// // import { useState } from "react"
// // import { View, TouchableOpacity, Button } from "react-native"

// // const ScanAndCreatePDF = () => {
// //   const [scannedImages, setScannedImages] = useState<string[]>([])

// //   const takePicture = async () => {
// //     // open the camera to capture an image
// //     const cameraOptions = {
// //       quality: 0.5,
// //       base64: true,
// //     }
// //     const { base64 } = await RNCamera.takePictureAsync(cameraOptions)

// //     // open the image cropper and allow the user to crop the image
// //     const image = await ImageCropPicker.openCropper({
// //       path: `data:image/jpeg;base64,${base64}`,
// //     })
// //     setScannedImages([...scannedImages, image.path])
// //   }

// //   const createPDF = async () => {
// //     // create a new PDF document
// //     const pdfDoc = PDFDocument()

// //     // add a page for each scanned image
// //     for (const image of scannedImages) {
// //       const page = PDFPage()
// //       pdfDoc.addPage(page)
// //       page.drawImage(image, "JPEG", 0, 0, page.getWidth(), page.getHeight())
// //     }

// //     // generate the PDF data
// //     const pdfData = await pdfDoc.save()

// //     // save the PDF to the device's storage
// //     RNFS.writeFile(`${RNFS.DocumentDirectoryPath}/scanned.pdf`, pdfData, "base64")
// //   }

// //   return (
// //     <View>
// //       {scannedImages.length === 0 && (
// //         <RNCamera
// //           style={styles.camera}
// //           type={RNCamera.Constants.Type.back}
// //           captureAudio={false}
// //           androidCameraPermissionOptions={{
// //             title: "Permission to use camera",
// //             message: "We need your permission to use your camera",
// //             buttonPositive: "Ok",
// //             buttonNegative: "Cancel",
// //           }}
// //         >
// //           <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
// //             <Text>Capture</Text>
// //           </TouchableOpacity>
// //         </RNCamera>
// //       )}
// //       {scannedImages.length > 0 && (
// //         <View style={styles.scannedImagesContainer}>
// //           {scannedImages.map((image, index) => (
// //             <Image key={index} style={styles.scannedImage} source={{ uri: image }} />
// //           ))}
// //           <Button title="Create PDF" onPress={createPDF} />
// //         </View>
// //       )}
// //     </View>
// //   )
// // }

// // import { PDFDocument, PDFPage } from "react-native-pdf-lib"
// // import DocumentScanner from "react-native-document-scanner"
// // import { useState } from "react"

// // const ScanAndCreatePDF = () => {
// //   const [scannedImages, setScannedImages] = useState<string[]>([])

// //   const scanDocument = async () => {
// //     // open the document scanner and capture an image
// //     const image = await DocumentScanner.scanDocument()
// //     setScannedImages([...scannedImages, image.path])
// //   }

// //   const createPDF = async () => {
// //     // create a new PDF document
// //     const pdfDoc = PDFDocument()

// //     // add a page for each scanned image
// //     for (const image of scannedImages) {
// //       const page = PDFPage()
// //       pdfDoc.add
// //     }
// //   }
// // }

// import React, { useState } from 'react';
// import { View, Button, Image } from 'react-native';
// import Camera from 'react-native-camera';
// import cv from 'opencv4nodejs';
// import PDF from 'react-native-pdf';

// const ScanAndCreatePDF = () => {
//   const [photos, setPhotos] = useState<string[]>([])
//   const [croppedPhotos, setCroppedPhotos] = useState<Buffer[]>([])

//   const capturePhoto = () => {
//     const options = {}
//     this.camera
//       .capture({ metadata: options })
//       .then((data) => setPhotos([...photos, data.path]))
//       .catch((err) => console.error(err))
//   }

//   const cropPhotos = () => {
//     photos.forEach((photo) => {
//       // Use OpenCV to detect the edges of the document in the photo
//       const image = cv.imread(photo)
//       const gray = image.cvtColor(cv.COLOR_BGR2GRAY)
//       const edges = gray.canny(0, 100)
//       const contours = edges.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
//       // Select the largest contour as the document
//       const sortedContours = contours.sort((c1, c2) => c2.area - c1.area)
//       const documentContour = sortedContours[0]
//       // Crop the image using the contour
//       const croppedImage = image.getRegion(documentContour.boundingRect())
//       setCroppedPhotos([...croppedPhotos, croppedImage])
//     })
//   }

//   const generatePDF = () => {
//     // Create a PDF from the croppedPhotos using the react-native-pdf library
//   }

//   return (
//     <View>
//       <Camera
//         ref={(cam) => {
//           this.camera = cam
//         }}
//         style={{
//           flex: 1,
//           width: "100%",
//           height: "100%",
//         }}
//         type={Camera.Constants.Type.back}
//         flashMode={Camera.Constants.FlashMode.on}
//         captureAudio={false}
//       >
//         <Button onPress={capturePhoto} title="Capture Photo" />
//       </Camera>
//       <Button onPress={cropPhotos} title="Crop Photos" />
//       <Button onPress={generatePDF} title="Generate PDF" />
//       {croppedPhotos.map((photo, index) => (
//         <Image key={index} source={{ uri: photo }} />
//       ))}
//       <PDF
//         source={{ uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf", cache: true }}
//       />
//     </View>
//   )
// }

import { Camera } from "expo-camera"
import ImagePicker from "react-native-image-crop-picker"
import PDF from "react-native-pdf-lib"
const ScanAndCreatePDF = () => {
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      ImagePicker.openCropper({
        path: data.uri,
        width: 300,
        height: 400,
      }).then((image) => {
        console.log(image)
        this.setState({ images: [...this.state.images, image.path] })
      })
    }
  }
  createPDF = async () => {
    const images = this.state.images
    const pdf = await PDF.create(images)
  }
  return (
    <View>
      <Camera ref={(ref) => (this.camera = ref)}>
        <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => this.takePicture()}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}> Take Picture </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}
