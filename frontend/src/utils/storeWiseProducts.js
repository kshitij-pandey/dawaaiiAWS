export function formatePack(pack){
    let newArray = []
    let storeIDs = []
   pack.products.forEach(product=>{
        const obj={
            storeID:"",
            products:[]
        }
        if(!(storeIDs.includes(product.storeID))){
            storeIDs.push(product.storeID)
            obj["storeID"]=product.storeID;
            obj.storeName=product.storeName;
            obj.city=product.city;
            obj.cluster=product.cluster;
           newArray.push(obj);
        }
    });

   newArray.forEach((obj)=>{
     pack.products.forEach((prod)=>{
          if(obj.storeID==prod.storeID){
             const prodObj={
                 productName:prod.productName,
                 productID:prod.productID,
                 productPrice:prod.productPrice,
                 quantity:prod.quantity
             }
           obj.products.push(prodObj);
          }
      })
    });
 return newArray
 }