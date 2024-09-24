import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function Password() {
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [character, setCharacter] = useState(false);
    const [password, setPassword] = useState('');

    const passwordRef = useRef(null);

    const copyToClipBoard = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    },[password])

    const passwordGenerator = useCallback(()=>{
        let pass = '';
        let str = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
        if(number){
            str+="0123456789";
        }
        if(character){
            str+="!@#$%^&*()_-+=|:;><?/";
        }
        for(let i=0; i<=length; i++){
            let char = Math.floor(Math.random()*str.length+1)
            pass += str.charAt(char);
            setPassword(pass)
        }
    }, [length, number, character, setPassword])

    useEffect(()=>{
        passwordGenerator();
    },[length, number, character, passwordGenerator])
  return (
    <>
   
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text-4xl text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" name="pass" id="pass" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' ref={passwordRef} readOnly/>
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyToClipBoard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-2'>
                <input type="range" name="ramge" id="range" min={8} max={20} className='curosor-pointer' onChange={(e)=>setLength(e.target.value)}/>
                <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-2'>
                <input type="checkbox" name="number" id="number" onChange={()=>setNumber((prev)=>!prev)}/>
                <label htmlFor="">Number</label>
            </div>
            <div className='flex items-center gap-x-2'>
                <input type="checkbox" name="char" id="char" onChange={()=>setCharacter((prev)=>!prev)} />
                <label htmlFor="">Special Character</label>
            </div>
        </div>
    </div>
    </>
  )
}
