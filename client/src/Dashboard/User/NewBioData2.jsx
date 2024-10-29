import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContextProvider';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const NewBioData2 = () => {
    const { signUp, updateUserProfile, setLoading, user, setUser, userInfo, setUserInfo, bioDataInfo, setBioDataInfo } = useContext(AuthContext);
    const [desc, setDesc] = useState('');
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        const { permanentDivision, presentDivision, phone, email, partnerHeight, partnerWeight, partnerAge } = data;

        setLoading(true);
        axiosPublic.get('/last-biodata-id')
            .then(res => {
                // console.log(res.data.length)
                const lastBioDataId = res.data.length === 0 ? 0 : res.data[0].bioData_id;
                const bioData_id = lastBioDataId + 1;
                const profile_image = userInfo?.photoURL;
                const contact_email = userInfo.email;
                const { bioData_type, name, date_of_birth, height, weight, age, occupation, race, fathers_name, mothers_name } = bioDataInfo;

                const newBioData = {
                    bioData_id,
                    bioData_type,
                    name,
                    profile_image,
                    date_of_birth,
                    height,
                    weight,
                    age,
                    occupation,
                    race,
                    fathers_name,
                    mothers_name,
                    permanent_division: permanentDivision,
                    present_division: presentDivision,
                    expected_partner_age: partnerAge,
                    expected_partner_height: partnerHeight,
                    expected_partner_weight: partnerWeight,
                    contact_email,
                    mobile_number: phone,
                    about: desc
                };
                // console.log(newBioData)
                if (userInfo.loginWith === "google") {
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                axiosPublic.post('/new-biodata', newBioData)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            toast.success("Signed up successfully");
                                            setUser({ ...userInfo });
                                            setLoading(false)
                                            navigate('/dashboard/user-home' || '/');
                                        }
                                    });
                            }
                        });

                    return
                }
                if (userInfo.loginWith === "github") {
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                axiosPublic.post('/new-biodata', newBioData)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            toast.success("Signed up successfully");
                                            setUser({ ...userInfo });
                                            setLoading(false)
                                            navigate('/dashboard/user-home' || '/');
                                        }
                                    });
                            }
                        });
                    window.reload();
                    return
                }
                signUp(userInfo?.email, userInfo?.password)
                    .then(result => {
                        updateUserProfile(result.user, userInfo?.displayName, userInfo?.photoURL)
                            .then(() => {
                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            axiosPublic.post('/new-biodata', newBioData)
                                                .then(res => {
                                                    if (res.data.insertedId) {
                                                        toast.success("Signed up successfully");
                                                        setUser({ ...userInfo });

                                                        navigate('/dashboard/user-home' || '/');
                                                    }
                                                });
                                        }
                                    });
                            })
                    }).catch(err => {
                        setLoading(false);
                        const firebaseError = err.message;
                        if (firebaseError.includes('already')) {
                            toast.error('Email is already in use. Please try with another email address');
                        }
                        if (firebaseError.includes('network')) {
                            toast.error('Network failed! please check your network connection');
                        }
                    });
            });
    }

    return (
        <div className='p-20 dark:bg-dark'>
            <Helmet>
                <title>dreamMate | Get Started</title>
            </Helmet>
            <h1 className='text-4xl text-primary font-semibold dark:text-primary2'>Additional Informations</h1>
            <h1 className='mt-12 text-heading dark:text-heading2'>Add Your Present And Permanent address</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-12'>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="presentDivision" className="mb-2 text-[12px] dark:text-Description2">Your Present State <span className="text-red-500">*</span></label>
                        </div>
                        <select {...register("presentDivision")} id="presentDivision" name="presentDivision" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Ladakh">Ladakh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        </select>
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="permanentDivision" className="mb-2 text-[12px] dark:text-Description2">Your Permanent State <span className="text-red-500">*</span></label>
                        </div>
                        <select {...register("permanentDivision")} id="permanentDivision" name="permanentDivision" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Ladakh">Ladakh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        </select>
                    </div>
                </div>
                <h1 className='mt-12 text-heading dark:text-heading2'>Add Your Contact Information</h1>
                <div className='flex gap-12'>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="phone" className="mb-2 text-[12px] dark:text-Description2">Your Phone Number <span className="text-red-500">*</span></label>
                        </div>
                        <input  {...register("phone")} type="text" id="phone" name="phone" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="+918189334***" required />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="email" className="mb-2 text-[12px] dark:text-Description2">Your Contact Email <span className="text-red-500">*</span></label>
                        </div>
                        <input  {...register("email")} type="email" id="email" name="email" defaultValue={userInfo?.email} className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Example@mail.com" readOnly required />
                    </div>
                </div>
                <h1 className='mt-12 text-heading dark:text-heading2'>Add Your Expecting Informations</h1>
                <div className='flex gap-12'>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="partnerAge" className="mb-2 text-[12px] dark:text-Description2">Partner Age<span className="text-red-500">*</span> </label>
                        </div>
                        <input {...register("partnerAge")} type="text" id="partnerAge" name="partnerAge" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="18" required />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="partnerHeight" className="mb-2 text-[12px] dark:text-Description2">Partner Height<span className="text-red-500">*</span> </label>
                        </div>
                        <input {...register("partnerHeight")} type="text" id="partnerHeight" name="partnerHeight" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="e.g., 170" required />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="partnerWeight" className="mb-2 text-[12px] dark:text-Description2">Partner Weight <span className="text-red-500">*</span></label>
                        </div>
                        <input {...register("partnerWeight")} type="text" id="partnerWeight" name="partnerWeight" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="e.g., 70" required />
                    </div>
                </div>

                <h1 className='mt-12 text-heading dark:text-heading2'>Write a Description About Yourself (50-60 Words)</h1>
                <label className=' mb-2 text-[12px] dark:text-Description2'>About<span className='text-red-500'> *</span></label>
                <textarea required onChange={(e) => setDesc(e.target.value)} placeholder='Write a description about this Job' className='border border-primary px-6 mt-2 py-[10px] rounded-md focus:outline-none w-full  text-primary' name="about" id="about" cols="30" rows="3"></textarea>
                <div className='mt-[40px] flex gap-6 justify-end'>
                    <Link className='bg-primary px-4 py-2 text-white' to={'/new-biodata'}>Previous</Link>
                    <button className='bg-primary px-4 py-2 text-white'>Get Started</button>
                </div>
            </form>
        </div>
    );
};

export default NewBioData2;
