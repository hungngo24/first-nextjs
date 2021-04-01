import Link from 'next/link';
import {useEffect,useState} from 'react';

export default function Index(){
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        async function loadData(){
            const response = await fetch('https://60648c98f0919700177860cb.mockapi.io/api/product');
            const productList = await response.json();
            setProducts(productList);
        }
        loadData(); 
    },[])
    return <div>
       {/* {products.map((e)=>(
           <pre> 
               <Link key={e.name} href={`/${e.producer}/${e.name}`}>
                    <a>Navigate to {e.name}  </a> 
                </Link> 
            </pre>
        ))} */}
        <Link href="/list">
            <a>Navigate to List</a>
        </Link>
    </div>
    
}