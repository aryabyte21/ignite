import React, { FC, useCallback, useState } from "react"
import * as Application from "expo-application"
import { ImageStyle, Linking, Platform, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Icon, ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import DocumentPicker from "react-native-document-picker"
import PocketBase from "pocketbase"
const $iconStyle: ImageStyle = { width: 30, height: 30 }

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

export const DemoDebugScreen: FC<DemoTabScreenProps<"DemoDebug">> = function DemoDebugScreen(
  _props,
) {
  const {
    authenticationStore: { logout },
  } = useStores()

  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

  const demoReactotron = React.useMemo(
    () => async () => {
      console.tron.display({
        name: "DISPLAY",
        value: {
          appId: Application.applicationId,
          appName: Application.applicationName,
          appVersion: Application.nativeApplicationVersion,
          appBuildVersion: Application.nativeBuildVersion,
          hermesEnabled: usingHermes,
        },
        important: true,
      })
    },
    [],
  )
   async function upload(){
    const pb = new PocketBase("http://127.0.0.1:8090")
      const formData = new FormData()
      const fileInput = document.getElementById("fileInput")
      fileInput.addEventListener("change", function () {
        for (let file of fileInput.files) {
          formData.append("documents", file)
        }
      })
      formData.append("title", "Hello world!")
      const createdRecord = await pb.collection("example").create(formData)

      ///
      
    } 
      const [singleFile, setSingleFile] = useState(null)
      const uploadImage = async () => {
        if (singleFile != null) {
          // If file selected then create FormData
          const fileToUpload = singleFile
          const data = new FormData()
          data.append("name", "Image Upload")
          data.append("file_attachment", fileToUpload)
          // Please change file upload URL
          let res = await fetch("http://localhost/upload.php", {
            method: "post",
            body: data,
            headers: {
              "Content-Type": "multipart/form-data; ",
            },
          })
          let responseJson = await res.json()
          if (responseJson.status == 1) {
            alert("Upload Successful")
          } else {
            // If no file selected the show alert
            alert("Please Select File first")
          }
        }
      }

    const selectFile = async () => {
      // Opening Document Picker to select one file
      try {
        const res = await DocumentPicker.pick({
          // Provide which type of file you want user to pick
          type: [DocumentPicker.types.allFiles],
          // There can me more options as well
          // DocumentPicker.types.allFiles
          // DocumentPicker.types.images
          // DocumentPicker.types.plainText
          // DocumentPicker.types.audio
          // DocumentPicker.types.pdf
        })
        // Printing the log realted to the file
        console.log("res : " + JSON.stringify(res))
        // Setting the state to show single file attributes
        setSingleFile(res)
      } catch (err) {
        setSingleFile(null)
        // Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
          // If user canceled the document selection
          alert("Canceled")
        } else {
          // For Unknown Error
          alert("Unknown Error: " + JSON.stringify(err))
          throw err
        }
      }
    }


    const [fileResponse, setFileResponse] = useState([])

    const handleDocumentSelection = useCallback(async () => {
      try {
        const response = await DocumentPicker.pick({
          presentationStyle: "fullScreen",
        })
        setFileResponse(response)
      } catch (err) {
        console.warn(err)
      }
    }, [])


  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text
        style={$reportBugsLink}
        tx="demoDebugScreen.reportBugs"
        onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite/issues")}
      />
      <Text style={$title} preset="heading" tx="demoDebugScreen.title" />
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Id</Text>
              <Text>{Application.applicationId}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Name</Text>
              <Text>{Application.applicationName}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Version</Text>
              <Text>{Application.nativeApplicationVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Build Version</Text>
              <Text>{Application.nativeBuildVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Hermes Enabled</Text>
              <Text>{String(usingHermes)}</Text>
            </View>
          }
        />
      </View>
      <View style={$buttonContainer}>
        <Button style={$button} tx="demoDebugScreen.reactotron" onPress={demoReactotron} />
        <Text style={$hint} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} />
      </View>
      <View style={$buttonContainer}>
        <Button style={$button} tx="common.logOut" onPress={logout} />
      </View>
      <Button
        preset="filled"
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
        onTouchStart={upload}
      >
        Upload your notes
      </Button>

      {/* Showing the data of selected Single file */}
      {singleFile != null ? (
        <Text>
          File Name: {singleFile.name ? singleFile.name : ""}
          {"\n"}
          Type: {singleFile.type ? singleFile.type : ""}
          {"\n"}
          File Size: {singleFile.size ? singleFile.size : ""}
          {"\n"}
          URI: {singleFile.uri ? singleFile.uri : ""}
          {"\n"}
        </Text>
      ) : null}
      <Button onPress={selectFile}>
        <Text>Select File</Text>
      </Button>
      <Button onPress={uploadImage}>
        <Text>Upload File</Text>
      </Button>

      {fileResponse.map((file, index) => (
        <Text key={index.toString()}  numberOfLines={1} ellipsizeMode={"middle"}>
          {file?.uri}
        </Text>
      ))}
      <Button onPress={handleDocumentSelection}>
        <Text>Upload File</Text>
      </Button>
    </Screen>
  )
}


const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingBottom: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.huge,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.large,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $item: ViewStyle = {
  marginBottom: spacing.medium,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.extraLarge,
}

const $button: ViewStyle = {
  marginBottom: spacing.extraSmall,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.medium,
}

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.large,
}

// @demo remove-file
