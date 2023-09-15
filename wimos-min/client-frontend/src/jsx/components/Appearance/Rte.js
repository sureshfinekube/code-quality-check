import React from "react";
import { Editor } from "@tinymce/tinymce-react";

class App extends React.Component {
  handleEditorChange = (content, editor) => {
    //console.log("Content was updated:", content);
  };

  render() {
    return (
      <Editor
        initialValue="<p></p>"
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist autolink lists link image code charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | code |link | image | bold italic backcolor |  alignleft aligncenter alignright alignjustify | \n" +
            "bullist numlist outdent indent | removeformat | help ",
          content_style: "body { color: #828282 }",
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default App;
