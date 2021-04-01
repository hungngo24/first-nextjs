import Link from 'next/link';
import {useEffect,useState} from 'react';
import { Product } from '../../api/Product';


export interface ListProps {
    productList : Product[];

}

export default function List({productList}:ListProps){
    const [products,setProducts]=useState(productList);
    console.log('1');
    console.log(products);
    useEffect(()=>{
        console.log('Effect');
        async function loadData(){
            const response = await fetch('https://60648c98f0919700177860cb.mockapi.io/api/product');
            const productList = await response.json();
            setProducts(productList);
        }
        if (productList.length==0) {
            loadData();
            console.log(productList)
        }
    },[])
    if (!products[0]) {
        return <div>
            Loading....
        </div>
    }
    return <div>
       {products?.map((e,index)=>(
           <div key={index}> 
               <Link key={e.name} href={`/${e.producer}/${e.name}`}>
                    <a>Navigate to {e.name}  </a> 
                </Link> 
            </div>
        ))}
    </div>
    
}


List.getInitialProps= async (context: { req?: any; query?: any; }) => {
    const {query} =context;
    const response = await fetch('https://60648c98f0919700177860cb.mockapi.io/api/product');
    const productList:Product[] = await response.json();
    if (!context.req) {
        return { productList:[] };
    }
    return {
        productList
    }
}