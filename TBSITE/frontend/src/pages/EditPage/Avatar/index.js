import React,{useState,useEffect} from 'react'
import {Container} from './styles'
import api from '../../../services/api'
import profile from '../../../assets/img/profile.png'
export default function Avatar(){
    const token= sessionStorage.getItem('token')
    
    const [file, setFile] = useState(undefined);
    const handleChange = (e) => {
        setFile(URL.createObjectURL(e ? e.target.files[0] : profile));
        handleAvatar(e)
        console.log(URL.createObjectURL(e ? e.target.files[0] : profile))
      }
    async function handleAvatar(e){
        const data=new FormData();
        data.append('file', e.target.files[0])
        console.log(data)
        const response= await api.post('/files',data,{
            headers: { Authorization: "Bearer " + token }})
        sessionStorage.setItem("avatar_path",response.data.path)
        console.log(response.data.path)

    }
    
    
    // useEffect(()=>{
    //     // getProfile()
    // })

    return (
    <>
        <Container>
            <label htmlFor="avatar">
                {/* { file && <img src={file}/>} */}
                {file ?
                <img src={file}/>
                :
                <img src={profile} className="edit-profile-photo" alt="profile"></img>
                }
                <input accept="image/*" type="file" id="avatar" onChange={e=>{handleChange(e)}}></input>
            </label>
        </Container>
    </>
    )
}