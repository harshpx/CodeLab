import React, { useContext, useState, useRef } from 'react'
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Upload, ConfigProvider } from 'antd';
import {basicSignup} from '../api/features';
import Loader from './Loader';
import logo from '/icon.png'
import { toast } from 'react-toastify';

const Signup = () => {
    const {user,setUser} = useContext(AppContext);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const ref = useRef(null);

    const [form] = Form.useForm();

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const data = await basicSignup(values);
            setUser(data);
            localStorage.setItem('currUser',JSON.stringify(data));
            toast.success('Logged in Successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    }


    return(
        <div className='h-full w-full flex items-center justify-center relative overflow-hidden text-white' ref={ref}>  
            <ConfigProvider
                theme={{
                    token:{
                        colorText: 'white',
                        colorBgContainer: '#1f1f1f',
                        colorPrimary: '#007cc4',
                    }
                }}
            >
            <Form
                form={form}
                // name="basic"
                // labelCol={{span: 8,}}
                // wrapperCol={{span: 16,}}
                // initialValues={{remember: true,}}
                onFinish={onSubmit}
                autoComplete="off"
                className='text-white rounded-lg p-6 pb-0 flex flex-col items-start justify-center w-full'
            >
                <div className=' self-center mb-5 flex items-center justify-center gap-4'>
                    <span className='text-xl'>Signup on</span>
                    <div className='flex items-center gap-2'>
                        <span className='text-2xl text-primary font-bold flex items-center justify-center gap-2'><img src={logo} alt="" className='size-8'/>CodeLab</span>
                    </div>
                </div>
                
                <div className='grid grid-cols-2 gap-x-3'>
                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[
                            {required: true, message: 'Please enter your username!',},
                        ]}
                        className='w-full'
                    >
                        <Input className='w-full'/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {required: true, message: 'Please enter your email!',},
                        ]}
                        className='w-full'
                    >
                        <Input className='w-full'/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {required: true, message: 'Please enter your password!',},
                        ]}
                        className='w-full'
                    >
                        <Input.Password className='w-full'/>
                    </Form.Item>
                   
                    <Form.Item className='flex justify-center items-center col-span-2'>
                        <Button type="primary" htmlType="submit" className=' bg-primary hover:scale-110 duration-200'>
                            Signup
                        </Button>
                    </Form.Item>
                </div>
            </Form>
            </ConfigProvider>
        </div>
    )
}

export default Signup;