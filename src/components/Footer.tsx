

const Footer = () => {
    return (
        <div className='bg-orange-500 py-10'>
            <div className='container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center'>
                <span className='text-3xl text-white font-bold tracking-tight'>
                    Uniservice.com
                </span>
                <span className='text-white font-bold tracking-tight flex gap-4 flex-col'>
                    <span className=''>Privacy of Policy</span>
                    <span className=''>Terms of Service</span>
                </span>
            </div>
        </div>
    );
}

export default Footer;
