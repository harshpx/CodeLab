import React from 'react'
import { Select, ConfigProvider} from 'antd'
import {useContext} from 'react'
import AppContext from '../context/AppContext'

const options = [
    {value: 'cpp17', label: 'C++'},
    {value: 'java', label: 'Java'},
    {value: 'python3', label: 'Python'},
    {value: 'c', label: 'C'},
    {value: 'csharp', label: 'C#'},
    {value: 'nodejs', label: 'JavaScript'},
    {value: 'dart', label: 'Dart'},
    {value: 'kotlin', label: 'Kotlin'},
    {value: 'swift', label: 'Swift'},
    {value: 'golang', label: 'Go'},
    {value: 'scala', label: 'Scala'},
    {value: 'r', label: 'R'},
    {value: 'bash', label: 'Bash'},
    {value: 'rust', label: 'Rust'},
    {value: 'ruby', label: 'Ruby'},
]

const LanguageSelector = () => {
    const {language,setLanguage,darkMode,setDarkMode} = useContext(AppContext);
    const handleChange = (value,data) => {
        // console.log(value);
        setLanguage(value);
    }
    // const handleSearch = (value) => {
    //     console.log(value);
    // }
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div className=''>
            <ConfigProvider
            theme={{
                token: {
                    colorBgContainer:'#1e1e1e',
                    colorText:'white',
                    colorTextPlaceholder:'#c0bebe',
                    controlHeight: '28px',
                    colorBgElevated: '#282828',
                    colorIcon: 'white',
                    // controlPaddingHorizontal: 10
                },
                components:{
                    Select:{
                        selectorBg:'#1e1e1e',
                        optionSelectedColor: 'black',
                        optionActiveBg: 'black',
                        optionPadding: '5px 10px',
                    }
                }
            }}>
                <Select
                showSearch
                placeholder="Choose Language"
                options={options}
                optionFilterProp="children"
                value={options.find(option => option.value === language)}
                onChange={handleChange}
                // onSearch={handleSearch}
                filterOption={filterOption}
                style={{ width: 150 }}
                />
            </ConfigProvider>
            
        </div>
    )
}

export default LanguageSelector