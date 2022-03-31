import React, { useEffect, useState } from "react";
import { Button,Input, Textarea,Dropdown ,Spinner} from 'vtex.styleguide';
import { makeAPICall } from "../../Utils/httpsCall";
import {PaginationFooter,FilterPaginationFooter} from "./PaginationFooter";
import {usePagination,useFilterPagination} from "./usePagination";
import styles from "./ViewBlogs.css";

const ViewBlogs = (props) => { 
    const [data, setData] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);  
    const [formValue, setFormValue] = useState(null);
    const [update, setUpdate] = useState(1);
    const [filterByCat, setFilterByCat] = useState("");
    const [loading, setLoading] = useState(false);
///////////////////////////////
    const [page, setPage] = useState(1);
    const [pageFilter, setPageFilter] = useState(1);
    const [spinner, setSpinner] = useState(true);
///////////////////////////////
    const DataFetchURL = props.documentsURL + `/api/dataentities/CB/search?_schema=customBlog&_fields=_all`;
    useEffect(()=>{
        const getDataAPICall = async () => {
            const responseData = await makeAPICall(DataFetchURL, "GET");
            console.log(`DataFetchResponse : `, responseData);
            responseData && setSpinner(false);
            setData(responseData);
        };    
        getDataAPICall();
        setShowUpdateForm(false);
        setLoading(false);
    }
    , [update,setFilterByCat]);

   
//---------------------------------------------------------------
    const handleChange = (e) => {            

            const { name, value } = e.target;
            let formdata = {
                ...formValue,
                [name]: value
            }
            setFormValue(formdata);
    }  
    

    const handleFormSubmit = async () => {
        setLoading(true);
        const updateDocURL = props.documentsURL+`/api/dataentities/CB/documents/${formValue.id}?_schema=customBlog`;
        console.log(updateDocURL);
        const reqData = {
            ...formValue
        }
        console.log(reqData);
      
        const responseData = await makeAPICall(updateDocURL, "PUT", reqData);
        console.log(`UpdateDocResponse : `, responseData);
  
        ////////////////////////////
        // setShowUpdateForm(false);
        // setTimeout(() => {
        //     setUpdate(update + 1);

        // }, 1000)
       
        //////////////////////////
        // props.updateBlogs();
        setUpdate(update + 1);
        
    }
    
    const handleFormUpdate = (id) => {
        console.log("handleFormUpdate");        
        const docArr = data && data.filter(doc => doc.id == id);
        console.log(docArr);
        
        const initialBlogData = {
            id:`${id}`,
            displayName: `${docArr[0].displayName}`,
            author:`${docArr[0].author}`,
            shortDescription: `${docArr[0].shortDescription}`,
            longDescription: `${docArr[0].longDescription}`,
            mainImage : `${docArr[0].mainImage}`,
            image2: `${docArr[0].image2}`,
            image3: `${docArr[0].image3}`,
            documentLink: `${docArr[0].documentLink}`,
            createdIn:`${docArr[0].createdIn}`,
            category: `${docArr[0].category}`,
            categoryId:`${docArr[0].categoryId}`,
        }
        
        setFormValue(initialBlogData);        
           
        setShowUpdateForm(true);       
        
    }

    let  formUpdate = formValue && <div>
    <div>
            <Input name="displayName"
                value={formValue.displayName}
                required={true} placeholder="Name"
                label="DisplayName"
                helpText="Maximum 50 characters allowed."
                onChange={(e) => handleChange(e)} />            
    </div>
    <div style={{ height: "30px" }}></div>
    <Input name="category" value={formValue.category} required={true} placeholder="Category" label="Category" onChange={(e) => handleChange(e)} />            
        <div style={{ height: "30px" }}></div>
        <Input name="categoryId" value={formValue.categoryId} required={true} placeholder="Category Id" label="Category Id" onChange={(e) => handleChange(e)} />            
    <div style={{ height: "30px" }}></div>
    <div>
    <Input name="author" value={formValue.author} required={true} placeholder="Author" label="Author" onChange={ (e)=>handleChange(e)}/>   
    </div>
    <div style={{height:"30px"}}></div>
    <div>
            <Input name="shortDescription"
                value={formValue.shortDescription} required={true}
                placeholder="Short Description"
                label="Enter a short description" onChange={(e) => handleChange(e)}
                helpText="Maximum 100 characters allowed."/>            
    </div>
    <div style={{height:"30px"}}></div>
    <div>
        <Textarea
            name="longDescription"
            value={formValue.longDescription} required={true} 
            placeholder="Long Description..."
            label="Enter a detailed description"
            onChange={e => handleChange(e)}
/>          
    </div>    

    <div style={{ height: "30px" }}></div>
    
    <Input name="mainImage" value={formValue.mainImage} placeholder="Image Link" label="Image link 1" helpText="Display image link" onChange={ (e)=>handleChange(e)}/>
    <div style={{ height: "30px" }}></div>    
    <Input name="image2" value={formValue.image2} placeholder="Image Link" label="Image link 2" helpText="Image link" onChange={ (e)=>handleChange(e)}/>
    <div style={{ height: "30px" }}></div>    
    <Input name="image3" value={formValue.image3} placeholder="Image Link" label="Image link 3" helpText="Image link" onChange={ (e)=>handleChange(e)}/>
    <div style={{ height: "30px" }}></div>    

       
    <Input name="documentLink" value={formValue.documentLink} placeholder="Document Link" label="Document Link"  onChange={ (e)=>handleChange(e)}/>
        <div style={{ height: "30px" }}></div>  
        
    <div style={{ textAlign: "center" }}> 
        <Button variation="danger" isLoading={loading} onClick={handleFormSubmit}>  UPDATE  </Button>
    </div>        
</div>    


//-----------------------------------------------------------------------

    const handleDelete = async (id) => {
        setLoading(true);
        const deleteDocURL = props.documentsURL + `/api/dataentities/CB/documents/${id}?_schema=customBlog`;
        console.log(deleteDocURL);
       
        const responsedeleteData =
            deleteDocURL && (await makeAPICall(deleteDocURL, "DELETE"));
        console.log(`DeleteDocByidResponse : `, deleteDocURL && responsedeleteData);
         
        setShowUpdateForm(false);
        
        setUpdate(update + 1);
    }

    ///////////////////////////////////////
    //paginationblogs--------------------------------------------------------------------------------
 
    let { slicedData, range } = usePagination(data && data,page, 2);
    console.log(slicedData, range);    
    let paginationblogs = <div>
        {slicedData && slicedData.map((doc, index) => {
        return (
            <div key={doc.id} className={styles.card}>
                <div className={styles.editDoc} >
                    
                    <div className={styles.btnUpdate} ><Button variation="danger" size="small" onClick={() => handleFormUpdate(doc.id)}  >
                        Update
                    </Button></div>
                    <div className={styles.btnDelete}> <Button variation="danger" size="small" onClick={() => handleDelete(doc.id)}  >
                        Delete
                    </Button></div>
                  
                </div>
                <div><p><strong> DisplayName :</strong> {doc.displayName}</p></div>
                <div><p><strong> Category :</strong> {doc.category}</p></div>
                <div><p><strong> Category Id :</strong> {doc.categoryId}</p></div>
                <div><p><strong> Short Description :</strong> {doc.shortDescription}</p></div>
                <div><p><strong> Long Description :</strong> {doc.longDescription}</p></div>
                <div><p><strong> Author :</strong> {doc.author}</p></div>
                <div><p><strong> Display Image Link :</strong> {doc.mainImage}</p></div>
                <div><p><strong> Image2 :</strong> {doc.image2}</p></div>
                <div><p><strong> Image3 :</strong> {doc.image3}</p></div>
                <div><p><strong> Document Link :</strong> {doc.documentLink}</p></div>
                <div><p><strong> Blog Id :</strong> {doc.id}</p></div>
                <div><p><strong> Created On :</strong> {doc.createdIn}</p></div>
                <div><p><strong> Updated On :</strong> {doc.updatedIn}</p></div>
                
            </div>
        );
    })}
       
        <div>
            
       { slicedData && range && <PaginationFooter
                 range={range}
                 slicedData={slicedData}
                 setPage={setPage}
                 page={page}
            />}
        </div>
    </div>;


    //////////////////////////////////////////

       
    const handleBackToForm = () => {
        props.closeBlogs();
    }

    const handleBackToBlogs = () => {
        setShowUpdateForm(false);
    }
//------------------------------------------------------------------------------------
 
    // let categories = data && data.map((ele) => {
    //     return ({ value: `${ele.category}`, label: `${ele.category}` })
    // });

    // categories && categories.push({ value: "All", label: "All" }).reverse();


    const categories = [
        { value: "All", label: "All" },
        { value: "Electronics", label: "Electronics" },
        { value: "Merchandise", label: "Merchandise" },
        { value: "Nismo", label: "Nismo" },
        { value: "Car-Parts", label: "Car-Parts" },
        { value: "Major-Appliances", label: "Major-Appliances" },
        { value: "Small-Appliances", label: "Small-Appliances" }     

    ];

const filterCatDropdown= data && categories && <Dropdown
label="Filter By Category"
size="small"
    options={categories}
    value={filterByCat.value}
onChange={(_, v) => setFilterByCat(()=>({ value: v }))}
        />
    console.log(categories);
console.log(filterByCat);
    
    let filterData = filterByCat && data.filter(ele => ele.category == filterByCat.value); 
   
    console.log(filterData);

   const filteredblogs = filterData && filterData.map((doc,index) => {
    return (
        <div key={doc.id} className={styles.card}>
            <div className={styles.editDoc} >  
                
            <div className={styles.btnUpdate} ><Button variation="danger" size="small" onClick={()=>handleFormUpdate(doc.id)}  >
               Update
               </Button></div>    
            <div className={styles.btnDelete}> <Button variation="danger" size="small" onClick={()=>handleDelete(doc.id)}  >
               Delete
               </Button></div>
              
            </div>
            <div><p><strong> DisplayName :</strong> {doc.displayName}</p></div>
            <div><p><strong> Category :</strong> {doc.category}</p></div>
            <div><p><strong> Category Id :</strong> {doc.categoryId}</p></div>
            <div><p><strong> Short Description :</strong> {doc.shortDescription}</p></div>
            <div><p><strong> Long Description :</strong> {doc.longDescription}</p></div>
            <div><p><strong> Author :</strong> {doc.author}</p></div>
            <div><p><strong> Display Image Link :</strong> {doc.mainImage}</p></div>
            <div><p><strong> Image2 :</strong> {doc.image2}</p></div>
            <div><p><strong> Image3 :</strong> { doc.image3}</p></div>
            <div><p><strong> Document Link :</strong> {doc.documentLink}</p></div>
            <div><p><strong> Blog Id :</strong> {doc.id}</p></div>
            <div><p><strong> Created On :</strong> {doc.createdIn}</p></div>
            <div><p><strong> Updated On :</strong> {doc.updatedIn}</p></div>                
            
        </div>
    )
   })
 //PaginationFilteredBlogs----------------------------------------------------------------------------------
    
    let categorySelected = filterByCat.value;
     const { slicedFData, rangeF } = useFilterPagination(categorySelected, filterData, pageFilter, 2);
    console.log("slicedFData",slicedFData, "rangeF",rangeF);
  const paginationFilteredBlogs = <div>{slicedFData && slicedFData.map((doc,index) => {
     return (
         <div key={doc.id} className={styles.card}>
             <div className={styles.editDoc} >                
             <div className={styles.btnUpdate} ><Button variation="danger" size="small" onClick={()=>handleFormUpdate(doc.id)}  >
                Update
                </Button></div>    
             <div className={styles.btnDelete}> <Button variation="danger" size="small" onClick={()=>handleDelete(doc.id)}  >
                Delete
                </Button></div>            
             </div>
             <div><p><strong> DisplayName :</strong> {doc.displayName}</p></div>
             <div><p><strong> Category :</strong> {doc.category}</p></div>
             <div><p><strong> Category Id :</strong> {doc.categoryId}</p></div>
             <div><p><strong> Short Description :</strong> {doc.shortDescription}</p></div>
             <div><p><strong> Long Description :</strong> {doc.longDescription}</p></div>
             <div><p><strong> Author :</strong> {doc.author}</p></div>
             <div><p><strong> Display Image Link :</strong> {doc.mainImage}</p></div>
             <div><p><strong> Image2 :</strong> {doc.image2}</p></div>
             <div><p><strong> Image3 :</strong> { doc.image3}</p></div>
             <div><p><strong> Document Link :</strong> {doc.documentLink}</p></div>
             <div><p><strong> Blog Id :</strong> {doc.id}</p></div>
             <div><p><strong> Created On :</strong> {doc.createdIn}</p></div>
             <div><p><strong> Updated On :</strong> {doc.updatedIn}</p></div>                          
         </div>
     )
  })}
      <div>            
             { slicedFData && rangeF && <FilterPaginationFooter
                       rangeF={rangeF}
                       slicedFData={slicedFData}
                       setPageFilter={setPageFilter}
                       pageFilter={pageFilter}
                  />}
              </div>
      </div>
    
//-------------------------------------------------------------------------------------------------------    
    let displayContent = showUpdateForm ? formUpdate : filterData.length > 0 ? paginationFilteredBlogs : paginationblogs;
    
//---------------------------------------------------------------------------------------------------------    
    return (
        <div>
            {!showUpdateForm &&
                <div>                
                    <Button variation="danger"  onClick={handleBackToForm}  >
                        Back to Form
                    </Button>
                    <div style={{margin:"20px auto" }}>{categories && filterCatDropdown}</div>   
                </div>}
            {showUpdateForm &&
                
                <div>
                <Button variation="danger"  onClick={handleBackToBlogs}  >
                Back to Blogs
                </Button>
                </div>}            
            
            <div className={styles.cardContainer}>  
                {spinner &&
                    <div className={styles.loadingSpinner}>
                    <Spinner color="red" size={80} /></div>}  
                    {displayContent}
            </div>
        </div> 
         )


    
};
export default ViewBlogs;
