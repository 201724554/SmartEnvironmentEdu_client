import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/i18n/ko-kr';
import {useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {customAxios} from "../../Common/CustomAxios";


function Upload() {
    const editorRef = useRef();
    const [title, setTitle] = useState("");

    function submit(e) {
        console.log(title)
        console.log(editorRef.current.getInstance().getHTML());

        e.preventDefault();
        e.persist();
        const files = e.target.file2upload.files;
        let formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        console.log(formData)
        /*customAxios.post("",{title: title, content: editorRef.current.getInstance().getHTML()})
            .then()
            .catch()*/
    }

    return (
        <>
            <form onSubmit={(e)=>submit(e)}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="제목을 입력하세요" onChange={(e) => {
                    setTitle(e.target.value)
                }}/>
            </div>
            <Editor
                initialValue="내용을 입력하세요"
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut="false"
                language="ko-KR"
                ref={editorRef}
            />
            <input type="file" name="file2upload" accept=".doc, .pdf, .txt" multiple="multiple"/>
            <Button type="submit">upload</Button>
            </form>
        </>
    );
}

export default Upload;