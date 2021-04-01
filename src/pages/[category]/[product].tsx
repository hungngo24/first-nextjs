import { NextPageContext } from 'next';
import {useRouter} from 'next/router';
import {useEffect,useState} from 'react';
import { Product } from './../../../api/Product';

export interface ProductProps{
    productList? : Product[];

}


export default function Product({productList}:ProductProps ){
    const routes =useRouter();
    console.log('1');
    const [products,setProducts]=useState(productList);
    useEffect(()=>{
        console.log('Effect');
        async function loadData(){
            const response = await fetch('https://60648c98f0919700177860cb.mockapi.io/api/product?name='+routes.query.product+'&category='+routes.query.category);
            const productList:Product[]| undefined  = await response.json();
            setProducts(productList);
        }
        if (productList?.length==0) {
            loadData();
            console.log(productList);
        }
    },[]) 
    if (!products?.[0]) {
        console.log(!products?.[0])
        return <div>
            Loading....
        </div>
    }
    return <pre>{products[0]?.name}</pre>
}

Product.getInitialProps  = async ({query,req}:NextPageContext) => {

    const response = await fetch('https://60648c98f0919700177860cb.mockapi.io/api/product?name='+query.product+'&category='+query.category);
    const productList:Product[] | undefined = await response.json();
    if (!req) {
        return { productList:[] };
    }
    return {
        productList
    }
}