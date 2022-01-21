import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ContactForm = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        subject: '',
        honeypot: '', // if any value received in this field, form submission will be ignored.
        message: '',
        replyTo: '@', // this will set replyTo of email to email address entered in the form
        accessKey: '125e8bf4-1b41-4471-a974-aaf792d1d841' // get your access key from https://www.staticforms.xyz
    });

    const [response, setResponse] = useState({
        type: '',
        message: ''
    });

    const handleChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
        const res = await fetch('https://api.staticforms.xyz/submit', {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: { 'Content-Type': 'application/json' }
        });

        const json = await res.json();

        if (json.success) {
            setContact({
                name: '',
                email: '',
                subject: '',
                honeypot: '', 
                message: '',
                replyTo: '@', 
            });
            notify();
        } else {
            notify();
        }
        } catch (e) {
            setResponse({type: 'error', message: 'An error occured while submitting the form'});
        }
    };

    const notify = () => {
        toast.dark("Your message has been sent!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    return (
        <div className='lg:w-2/3 w-full m-auto'>
            <form 
                action="https://api.staticforms.xyz/submit" 
                method="post" 
                className=''
                onSubmit={handleSubmit}
                noValidate
            >
                <input 
                    type="hidden" 
                    name="accessKey" 
                    value="scxc-9dbc-455d-899d-73531e4e156b" 
                />
                <div className="mb-4">
                    <input 
                        className="bg-gray-primary text-base lg:text-base text-gray-700 appearance-none border rounded border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="name" 
                        type="text" 
                        name="name" 
                        placeholder="Name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input 
                        className="bg-gray-primary text-base lg:text-base text-gray-700 appearance-none border rounded border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="email" 
                        name="email" 
                        placeholder="example@example.com" 
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input 
                        className="bg-gray-primary text-base lg:text-base text-gray-700 appearance-none border rounded border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="subject" 
                        type="subject" 
                        name="subject" 
                        placeholder="Subject"
                        value={contact.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea 
                        className="bg-gray-primary text-base lg:text-base text-gray-700 h-10-em appearance-none border rounded border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="message" 
                        type="message" 
                        name="message" 
                        placeholder="Message"
                        value={contact.message}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="flex items-center justify-end cursor-pointer">
                    <input className="border-solid border border-gray-600 bg-gray-primary cursor-pointer text-base lg:text-base text-gray-700  w-full hover:bg-white  font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit" value="SUBMIT" />
                </div>
                <input type="text" name="honeypot" style={{display: 'none'}} /> 
            </form>
            <ToastContainer />
        </div>
    );
};

export default ContactForm;