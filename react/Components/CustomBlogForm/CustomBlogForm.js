import React, { useEffect, useState } from "react";
import { Input, Textarea, Button,Dropzone } from 'vtex.styleguide';
import { makeAPICall } from "../../Utils/httpsCall";

const CustomBlogForm = (props) => { 
    
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const createDocumentURL = props.documentsURL + "/api/dataentities/CB/documents?_schema=customBlog";
   

    const initialValue = {        
        displayName: "",
        author:"",
        shortDescription: "",
        longDescription: "",
        mainImage : "",
        image2: "",
        image3: "",
        documentLink: "",
        category:"",
    }
    const [inputChange, setinputChange] = useState(initialValue);
    const [errormsg, setErrormsg] = useState({
        displayName: "",
        author: "",
        category: "",
        shortDescription: "",
       
    });
    const [visited, setVisited] = useState({
        displayName: false,
        author: false,
        category: false,
        shortDescription: false,
       
    });
    
    

    useEffect(() => {    
    
    }, [
        setErrormsg, handleSubmit
    ]);

  
        const handleChange = (e) => {
        const { name, value } = e.target;
            let data = {
                ...inputChange,
                [name]: value
            };
            let inputTouched = {
                ...visited,
                [name]: true
            }
            setVisited(inputTouched);
            setinputChange(data);   
            validate(data,name);
    }


    const validate = (data, name) => {
        (name=='displayName')&&data.displayName.length < 1 ? setErrormsg((errormsg) => ({ ...errormsg, displayName: "Required field" })): data.displayName.length > 50? setErrormsg((errormsg) => ({ ...errormsg, displayName: "Length exceeded." })) :setErrormsg((errormsg) => ({ ...errormsg, displayName: "" }));
        (name == 'author')&&data.author.length < 1 ? setErrormsg((errormsg) => ({ ...errormsg, author: "Required field" })) : setErrormsg((errormsg) => ({ ...errormsg, author: "" }));
        (name=='category')&&data.category.length < 1 ? setErrormsg((errormsg) => ({ ...errormsg, category: "Required field" })) : setErrormsg((errormsg) => ({ ...errormsg, category: "" }));        
        (name=='shortDescription')&&data.shortDescription.length < 1 ? setErrormsg((errormsg) => ({ ...errormsg, shortDescription: "Required field" })) : data.shortDescription.length > 100 ? setErrormsg((errormsg) => ({ ...errormsg, shortDescription: "Length exceeded." })) : setErrormsg((errormsg) => ({ ...errormsg, shortDescription: "" }));
        
      
    }
    const createDocument = async () => {        
        const responseData = await makeAPICall(createDocumentURL, "POST", inputChange);
        console.log(`CreateDocResponse : `, responseData); 
        setLoading(false);
        setShowSuccess(true);
    }

 
    const handleSubmit = () => {  

       
        setLoading(true);
        console.log("msg",errormsg, errormsg.displayName, errormsg.author);
        let validationSuccess = ((visited.displayName && errormsg.displayName == "") &&
            (visited.author && errormsg.author == "") &&
            (visited.category && errormsg.category == "") &&
            (visited.shortDescription && errormsg.shortDescription == ""));
        
        console.log("validation", validationSuccess);
        
        inputChange.displayName.length < 1 ? setErrormsg((errormsg) => ({ ...errormsg, displayName: "Required field" })): inputChange.displayName.length > 50? setErrormsg((errormsg) => ({ ...errormsg, displayName: "Length exceeded." })) :setErrormsg((errormsg) => ({ ...errormsg, displayName: "" }));
        inputChange.author.length < 1 ? setErrormsg((errormsg) => ({ ...errormsg, author: "Required field" })) : setErrormsg((errormsg) => ({ ...errormsg, author: "" }));
        inputChange.category.length < 1 ? setErrormsg((errormsg) => ({ ...errormsg, category: "Required field" })) : setErrormsg((errormsg) => ({ ...errormsg, category: "" }));       
        inputChange.shortDescription.length < 1 ? setErrormsg((errormsg) => ({ ...errormsg, shortDescription: "Required field" })) : inputChange.shortDescription.length > 100 ? setErrormsg((errormsg) => ({ ...errormsg, shortDescription: "Length exceeded." })) : setErrormsg((errormsg) => ({ ...errormsg, shortDescription: "" }));
        

        validationSuccess && createDocument();
    } 

    const handleReset = () => {
      
        setinputChange(initialValue);
        setErrormsg({
            displayName: "",
            author: "",
            category: "",
            shortDescription: "",
           
        });
    }

    let createBlogform;
    createBlogform = <div>
         <h3 >Fill The Below Form To Create a New Blog:</h3>
        <div>
            <Input
                name="displayName"
                value={inputChange.displayName}
                required={true} placeholder="Name"
                label="DisplayName"
                helpText="Maximum 50 characters allowed."
                onChange={(e) => handleChange(e)}
                errorMessage={errormsg.displayName}/>            
        </div>
        <div style={{ height: "24px" }}></div>
        <Input name="category"
            value={inputChange.category}
            required={true} placeholder="Category"
            label="Category" onChange={(e) => handleChange(e)}
            errorMessage={errormsg.category}
        />            
        <div style={{ height: "24px" }}></div>
        <div>
            <Input name="author"
                value={inputChange.author}
                required={true} placeholder="Author"
                label="Author" onChange={(e) => handleChange(e)}
                errorMessage={errormsg.author}
            />   
        </div>
        <div style={{height:"24px"}}></div>
        <div >
            <Input name="shortDescription" value={inputChange.shortDescription}
                required={true} placeholder="Short Description"
                label="Enter a short description" onChange={(e) => handleChange(e)}
                helpText="Maximum 100 characters allowed."
                errorMessage={errormsg.shortDescription}
            />            
        </div>
        <div style={{height:"24px"}}></div>
        <div >
            <Textarea
                name="longDescription"
                value={inputChange.longDescription} required={true} 
                placeholder="Long Description..."
                label="Enter a detailed description"
                onChange={e => handleChange(e)}
    />          
        </div>    

        <div style={{ height: "24px" }}></div>
        
        <Input name="mainImage"
            value={inputChange.mainImage}
            placeholder="Image Link"
            label="Image link 1"
            helpText="Display image link"
            onChange={(e) => handleChange(e)} />
        <div style={{ height: "24px" }}></div>    
        <Input name="image2" value={inputChange.image2} placeholder="Image Link" label="Image link 2" helpText="Image link" onChange={ (e)=>handleChange(e)}/>
        <div style={{ height: "24px" }}></div>    
        <Input name="image3" value={inputChange.image3} placeholder="Image Link" label="Image link 3" helpText="Image link" onChange={ (e)=>handleChange(e)}/>
        <div style={{ height: "24px" }}></div>    
    
           
        <Input name="documentLink" value={inputChange.documentLink} placeholder="Document Link" label="Document Link"  onChange={ (e)=>handleChange(e)}/>
        <div style={{ height: "24px" }}></div>    
        <div style={{ textAlign: "center" }}>            
            <Button variation="danger" onClick={handleReset} style={{ marginRight: "30px" }}>  RESET  </Button>
            <span style={{ width: "50px", height: "30px" }}>    </span>           
            <Button variation="danger" disabled={false} handleSubmit onClick={handleSubmit} style={{ marginLeft: "30px" }}>  SUBMIT  </Button>
         
    </div>        
    </div>
   
    const successCard = <div
        style={{
            boxSizing: "border-box",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            borderRadius:"10px"
        }}>
        <div style={{padding:"50px",margin:"20px"}}><h2>Congratulations!!</h2>
            <p>You have created a Blog!</p>
        </div>
        </div>
        

    let displayContent = showSuccess ? successCard:createBlogform;

    return (
        <div>
            {displayContent}
        </div>)
    
};
export default CustomBlogForm;
