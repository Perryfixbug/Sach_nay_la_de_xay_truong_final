import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import styles from './BackTo.module.css'
import clsx from 'clsx'

const BackTo = () => {
    const navigate = useNavigate()
    return (
        <div className={clsx(styles.back_to)} onClick={()=>navigate(-1)} style={{width: '120px', position: 'relative', top: 0, left: 0}}>
            <img src={assets.back_page} className='icon'/>
            <h1 className={clsx('sub-accent-color')} >Quay lại</h1>
        </div>
    )
}

export default BackTo