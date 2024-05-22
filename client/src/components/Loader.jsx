import { RotatingSquare } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='z-10 min-h-screen min-w-full absolute top-0 flex items-center justify-center bg-opacity-50 bg-black'>
            <RotatingSquare 
                visible={true}
                height="100"
                width="100"
                color="#109cee"
                ariaLabel="rotating-square-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader;