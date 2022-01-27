import React, { useState } from "react";
import { Layout, PageBlock,Button,Spinner} from 'vtex.styleguide';
import CustomBlogForm from "./CustomBlogForm/CustomBlogForm";
import ViewBlogs from "./ViewBlogs/ViewBlogs";

const CustomBlog = () => {

    const loadingSpinnerStyle={
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "20px",
        color:"black"
    }

    const get_location = window.location.href;
    const locationArr = get_location.split("/");
    const documentsURL = locationArr[0] + "//" + locationArr[2];  
    const [showBlogs, setShowBlogs] = useState(false);
    const [loading, setLoading] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const handleClick = () => {        
        setLoading(true);
        setSpinner(true);
        setTimeout(() => {                 
            setShowBlogs(true);
            setSpinner(false);            
            }, 4500)
       
    }
    
    const handleClose = () => {
        setShowBlogs(false);
        setLoading(false)
    }

    let displayForm =
        <div>
            <div style={{ textAlign: "right" }}>
                <Button variation="danger" onClick={handleClick}
                     isLoading={loading}
                >
                   VIEW BLOGS
                   </Button>
            </div> 

            <div>
                    <CustomBlogForm documentsURL={documentsURL}
                    
                />
            </div>
            
        </div>
    
    
    let displayContent = showBlogs ?
        <ViewBlogs closeBlogs={handleClose}
            documentsURL={documentsURL}           
            rowsPerPage={3}
        /> : displayForm;


    return (
    <Layout>
      <PageBlock
        title="Custom Blog"
        subtitle="Create or update Blogs!"
        variation="full" >
                
                {spinner &&
                    (<div><h2 style={loadingSpinnerStyle}>Fetching Data From MasterData...</h2>
                    <div style={loadingSpinnerStyle}>                        
                    <Spinner color="red" size={80} /></div></div>)}  
                {!spinner && displayContent}

      </PageBlock>
    </Layout>
    )
    
};
export default CustomBlog;
