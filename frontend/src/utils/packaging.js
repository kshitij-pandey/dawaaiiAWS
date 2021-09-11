
function findCheapest(stores){
  let min_price=Number.MAX_VALUE;
  let cheapestStore={
      storeID:"",
      productPrice:min_price
};
let bestStoreId;
  for(let i=0;i<stores.length;i++){
      if(stores[i].productPrice<min_price){
          min_price=stores[i].productPrice;
          bestStoreId=stores[i].storeID;
      }
  }
  cheapestStore.storeID=bestStoreId;
  cheapestStore.productPrice=min_price;
  return cheapestStore;
}

async function getStoreDetails(storeIDs){
    const storeIDData=[]
     storeIDs.forEach((id)=>{
         storeIDData.push(id)
     });
   const res=await fetch(`http://localhost:8000/store/getStoreDetails`,
   {
    method: "POST",
    headers: new Headers({
        "Content-Type": "application/json",
    }),
    body:JSON.stringify(storeIDs)
    }
   );
   const storeDetails=await res.json();
   return storeDetails;
}

export async function DawaaiBest(products){
    const dawaaiPackageProducts=[];
   if(products && products.length<1){
       return {};
   } 
   products.map((product)=>{
       //Return a package 
       const cheapestStore=findCheapest(product.stores);
       const packageItem={
           productID:product.productID,
           productName:product.productName,
           itemCount:1,
           quantity:product.quantity,
           storeID:cheapestStore.storeID,
           productPrice:cheapestStore.productPrice
       }
       dawaaiPackageProducts.push(packageItem);
   });
   // For each product get The store Name and cluster using its storeID
   //Input: [Array of StoreIDs] 
   const storeIDs=[];
  
   dawaaiPackageProducts.forEach((product)=>{
    storeIDs.push(product.storeID);
   });
  
const storeDetails=await getStoreDetails(storeIDs);
console.log("ass",storeDetails)
  let packagePrice=0;
   for(let i=0;i<dawaaiPackageProducts.length;i++){
    dawaaiPackageProducts[i].storeName=storeDetails[i].storeName;
    dawaaiPackageProducts[i].cluster=storeDetails[i].cluster;
    packagePrice+=dawaaiPackageProducts[i].productPrice;
   }
   const dawaaiPackage={
       packagePrice:packagePrice,
       products:dawaaiPackageProducts
   }
  return dawaaiPackage; 
}


//_______________________________________________________________________________________________________

//Assuming products to be products which are not available in cluster and our city to be city

 export async function bestPackageInCity(products,storesInCity){
    const cityPackageProducts=[];
    const unavailable=[];
   if(products.length<1){
       return {};
   } 
 
products.map((product)=>{
    if(product.stores.length){
        const req_stores=[]
        product.stores.forEach(store=>{
          storesInCity.forEach((str)=>{
          if(str.storeID==store.storeID){
              req_stores.push(store)
          }
          });
        })
        if(!req_stores.length){
           unavailable.push(product.productID); 
        }
        else{
         product.stores=req_stores;
        }
    }
});
 const availableProducts=products.filter((product)=>
   (!unavailable.includes(product.productID))
 );
 availableProducts.map((product)=>{
    //Return a package 
    const cheapestStore=findCheapest(product.stores);
    const packageItem={
        productID:product.productID,
        productName:product.productName,
        itemCount:1,
        quantity:product.quantity,
        storeID:cheapestStore.storeID,
        productPrice:cheapestStore.productPrice
    }
    cityPackageProducts.push(packageItem);
});

const storeIDs=[];
  
cityPackageProducts.forEach((product)=>{
 storeIDs.push(product.storeID);
});

const storeDetails=await getStoreDetails(storeIDs);
console.log(storeDetails)
let price=0;
for(let i=0;i<cityPackageProducts.length;i++){
cityPackageProducts[i].storeName=storeDetails[i].storeName;
 cityPackageProducts[i].cluster=storeDetails[i].cluster;
 price+=cityPackageProducts[i].productPrice;
}
const cityPackage={packagePrice:price,products:cityPackageProducts}

return cityPackage; 
}


//_____________________________________________________________________________________________________

const sortFunc = (a, b) => {
    if (a.productPrice <= b.productPrice) return -1;
    //chande by mayur   string to number
    else return 1;
};

export const getAllDeals = async (productsInCluster,storesInCluster) => {
    console.log(productsInCluster);
    productsInCluster.sort((a, b) => {
        if (a.stores.length < b.stores.length) return -1;
        else return 1;
    });

    if (productsInCluster.length <= 0) {
        return [];
        
    } else if (productsInCluster.length === 1) {
    
            productsInCluster[0].stores.sort((a,b)=>{
                if (a.productPrice <b.productPrice) return -1;
        else return 1;  
            });
    
        let packages = [];
        productsInCluster[0].stores.map((store) => {
            let obj = {
                "price":0,
                "products":[]
        
        };
        const packageItem={
            productID:productsInCluster[0].productID,
            productName:productsInCluster[0].productName,
            itemCount:1,
            quantity:productsInCluster[0].quantity,
            storeID: store.storeID,
            productPrice:store.productPrice
        }
        storesInCluster.forEach((str)=>{
            if(packageItem.storeID==str.storeID){
                packageItem.storeName=str.storeName;
                packageItem.city=str.city;
                packageItem.cluster=str.cluster;
            }
         })
            obj[`products`].push(packageItem);
            obj[`price`] = store.productPrice;
            packages.push(obj);
        });
        return packages;
    } else {
        productsInCluster.forEach((pro) => {
            pro.stores.sort(sortFunc);
        });
        let count=0;
        for(let i=0;i<productsInCluster.length;i++){
          count+=productsInCluster[i].stores.length
        }
       return getPackages(
           productsInCluster[0].stores.length* productsInCluster[1].stores.length,productsInCluster,storesInCluster
        );
    }
};



const getPackages = (k,productsInCluster,storesInCluster) => {
    console.log(".......... ",productsInCluster);
    let packages = [];

    var indexArrays = new Array(productsInCluster.length - 1);
    for (var i = 0; i < productsInCluster.length - 1; i++) {
        indexArrays[i] = new Array(productsInCluster[0].stores.length);
        indexArrays[i].fill(0);
    }
    k = k < 10 ? k : 10;
    // k = 12;

    while (k > 0) {
    
        let min_sum = Number.MAX_VALUE;
        let min_index = 0;
        let flag = false;
        for (let i = 0; i < productsInCluster[0].stores.length; i++) {
            flag = false;
            let sum =0;
            sum=sum+productsInCluster[0].stores[i].productPrice; //chande by mayur string to number
            const obj=[];
            for (let j = 0; j < productsInCluster.length - 1; j++) {
                if (indexArrays[j][i] >= productsInCluster[j + 1].stores.length) {

                    flag = true;
                    break;
                }

                sum += +productsInCluster[j + 1].stores[indexArrays[j][i]].productPrice; //chande by mayur   string to number
            }
            console.log("we are forming using {"+ [i,indexArrays[0][i]] + "}")
           if(flag ){continue ;}
        
            if ( sum < min_sum) {
                min_index = i;
                min_sum = sum;
            }
        }

        let obj = {
            price:0,
            products:[]
        };

        const packageItem={
            productID:productsInCluster[0].productID,
            productName:productsInCluster[0].productName,
            itemCount:1,
            quantity:productsInCluster[0].quantity,
            storeID: productsInCluster[0].stores[min_index].storeID,
            productPrice:productsInCluster[0].stores[min_index].productPrice
        }
        storesInCluster.forEach((str)=>{
           if(packageItem.storeID==str.storeID){
               packageItem.storeName=str.storeName;
               packageItem.city=str.city;
               packageItem.cluster=str.cluster;
           }
        })
        obj["products"].push(packageItem)
        for (let i = 0; i < productsInCluster.length - 1; i++) {
 console.log("debug",productsInCluster,i,productsInCluster[i+1].stores[indexArrays[i][min_index]],indexArrays[0])
            const packageItem={
                productID:productsInCluster[i+1].productID,
                productName:productsInCluster[i+1].productName,
                itemCount:1,
                quantity:productsInCluster[i+1].quantity,
                storeID: productsInCluster[i+1].stores[indexArrays[i][min_index]].storeID,
                productPrice:productsInCluster[i+1].stores[indexArrays[i][min_index]].productPrice
            }
            storesInCluster.forEach((str)=>{
                if(packageItem.storeID==str.storeID){
                    packageItem.storeName=str.storeName;
                    packageItem.city=str.city;
                    packageItem.cluster=str.cluster;
                }
             });
            obj["products"].push(packageItem);
        }
        
        obj["price"] = min_sum;
        
        for (let i = 0; i < productsInCluster.length - 1; i++) {
            indexArrays[i][min_index]++;
        }

        packages.push(obj);

        k--;
    }


    // packages ko console.log karke dekh le kaisa structure hai...
    // uske hisaab se frontend me display ho jaaega

  return packages;
};











//--------------------------------------------------------------------------------------------------------
// getProducts
// getAllStoresInCluster
// we call this with founded ProductsAvailableInCluster
// city tho ProductsUnavailableInCluster

// allStoresInCluster [storeID:{},{},{}]
// availableProducts= 
// unavailable
// AllStoresInCity