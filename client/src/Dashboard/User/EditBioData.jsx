import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DatePicker from "react-datepicker";
import { AuthContext } from '../../Provider/AuthContextProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import "react-datepicker/dist/react-datepicker.css";
import Lottie from 'lottie-react';
import loadingLottie from '../../../public/loadingLottie.json'
import Swal from 'sweetalert2';

const axiosPublic = useAxiosPublic();

const fetchBiodata = async ({ queryKey }) => {
    const [, email] = queryKey;
    if (!email) return;
    const { data } = await axiosPublic.get(`/user/biodata?email=${email}`);
    return data;
};


const EditBioData = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { data, error, isLoading } = useQuery({
        queryKey: ['biodata', email],
        queryFn: fetchBiodata,
        enabled: !!email,
    });

    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [ages, setAges] = useState("");
    const [occupation, setOccupation] = useState("");
    const [race, setRace] = useState("");
    const [fathersName, setFathersName] = useState("");
    const [mothersName, setMothersName] = useState("");
    const [permanentDivision, setPermanentDivision] = useState("");
    const [presentDivision, setPresentDivision] = useState("");
    const [expectedPartnerAge, setExpectedPartnerAge] = useState("");
    const [expectedPartnerHeight, setExpectedPartnerHeight] = useState("");
    const [expectedPartnerWeight, setExpectedPartnerWeight] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [desc, setDesc] = useState("");

    useEffect(() => {
        if (data) {
            setName(data.name);
            setProfileImage(data.profile_image);
            setGender(data.bioData_type);
            setHeight(data.height);
            setWeight(data.weight);
            setAges(data.age);
            setOccupation(data.occupation);
            setRace(data.race);
            setFathersName(data.fathers_name);
            setMothersName(data.mothers_name);
            setPermanentDivision(data.permanent_division);
            setPresentDivision(data.present_division);
            setExpectedPartnerAge(data.expected_partner_age);
            setExpectedPartnerHeight(data.expected_partner_height);
            setExpectedPartnerWeight(data.expected_partner_weight);
            setContactEmail(data.contact_email);
            setPhone(data.mobile_number);
            setDateOfBirth(new Date(data.date_of_birth));
            setDesc(data.about);
        }
    }, [data]);

    if (isLoading) {
        return (
            <div>
                <Lottie style={{ width: 550, marginLeft: 'auto', marginRight: 'auto' }} animationData={loadingLottie}></Lottie>
            </div>
        )
    };
    if (error) return <div>Error loading biodata</div>;

    const handleSubmit = (event) => {
        event.preventDefault();
        const age = parseInt(ages);
        const date_of_birth = dateOfBirth.toLocaleDateString();
        const formData = {
            name,
            profile_image: profileImage,
            bioData_type: gender,
            height,
            weight,
            age,
            occupation,
            race,
            fathers_name: fathersName,
            mothers_name: mothersName,
            permanent_division: permanentDivision,
            present_division: presentDivision,
            expected_partner_age: expectedPartnerAge,
            expected_partner_height: expectedPartnerHeight,
            expected_partner_weight: expectedPartnerWeight,
            contact_email: contactEmail,
            mobile_number: phone,
            date_of_birth,
            about: desc
        };

        axiosPublic.put(`/update/biodata/${email}`, formData)
            .then(res => {
                // console.log(res.data);
                Swal.fire({
                    title: 'Updated Successfully!',
                    text: 'Your job data has been updated successfully',
                    icon: 'success',
                    iconColor: "#1CA774",
                    confirmButtonColor: "#1CA774",
                    confirmButtonText: 'Cool'
                })
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='lg:pt-16 pt-12 px-6 lg:px-12'>
            <h1 className='text-xl md:text-2xl dark:text-heading2'>Edit Biodata</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex md:flex-row flex-col md:gap-12 '>
                    <div className="mt-4 w-full">
                        <label htmlFor="name" className="mb-2 text-[12px] dark:text-Description2">Your Name</label>
                        <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} id="name" name="name" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Your Name" required />
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="profile_image" className="mb-2 text-[12px] dark:text-Description2">Profile Image URL</label>
                        <input type="text" defaultValue={profileImage} onChange={(e) => setProfileImage(e.target.value)} id="profile_image" name="profile_image" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Profile Image URL" required />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col md:gap-12 '>
                    <div className="mt-4 w-full">
                        <label htmlFor="gender" className="mb-2 text-[12px] dark:text-Description2">Gender <span className="text-red-500">*</span></label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} id="gender" name="gender" className="focus:outline-none rounded-lg w-full px-4 py-2 mt-2 dark:text-heading2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="height" className="mb-2 text-[12px] dark:text-Description2">Height</label>
                        <select value={height} onChange={(e) => setHeight(e.target.value)} id="height" name="height" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            {Array.from({ length: 100 }, (_, i) => 150 + i).map(height => (
                                <option key={height} value={`${height} cm`}>{height} cm</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col md:gap-12 '>
                    <div className="mt-4 w-full">
                        <label htmlFor="weight" className="mb-2 text-[12px] dark:text-Description2">Weight</label>
                        <select value={weight} onChange={(e) => setWeight(e.target.value)} id="weight" name="weight" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            {Array.from({ length: 150 }, (_, i) => 40 + i).map(weight => (
                                <option key={weight} value={`${weight} kg`}>{weight} kg</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="age" className="mb-2 text-[12px] dark:text-Description2">Age</label>
                        <input type="number" value={ages} onChange={(e) => setAges(e.target.value)} id="age" name="age" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Age" required />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col md:gap-12 '>
                    <div className="mt-4 w-full">
                        <label htmlFor="occupation" className="mb-2 text-[12px] dark:text-Description2">Occupation</label>
                        <select value={occupation} onChange={(e) => setOccupation(e.target.value)} id="occupation" name="occupation" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Artist">Artist</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="race" className="mb-2 text-[12px] dark:text-Description2">Race</label>
                        <select value={race} onChange={(e) => setRace(e.target.value)} id="race" name="race" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            <option value="Asian">Asian</option>
                            <option value="African">African</option>
                            <option value="Caucasian">Caucasian</option>
                            <option value="Hispanic">Hispanic</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col md:gap-12 '>
                    <div className="mt-4 w-full">
                        <label htmlFor="fathers_name" className="mb-2 text-[12px] dark:text-Description2">Father's Name</label>
                        <input type="text" value={fathersName} onChange={(e) => setFathersName(e.target.value)} id="fathers_name" name="fathers_name" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Father's Name" required />
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="mothers_name" className="mb-2 text-[12px] dark:text-Description2">Mother's Name</label>
                        <input type="text" value={mothersName} onChange={(e) => setMothersName(e.target.value)} id="mothers_name" name="mothers_name" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Mother's Name" required />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col md:gap-12 '>
                    <div className="mt-4 w-full">
                        <label htmlFor="permanent_division" className="mb-2 text-[12px] dark:text-Description2">Permanent Division</label>
                        <select value={permanentDivision} onChange={(e) => setPermanentDivision(e.target.value)} id="permanent_division" name="permanent_division" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
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
                        <label htmlFor="present_division" className="mb-2 text-[12px] dark:text-Description2">Present Division</label>
                        <select value={presentDivision} onChange={(e) => setPresentDivision(e.target.value)} id="present_division" name="present_division" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
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
                <div className='flex md:flex-row flex-col md:gap-12'>
                    <div className="mt-4 w-full">
                        <label htmlFor="expected_partner_age" className="mb-2 text-[12px] dark:text-Description2">Expected Partner Age</label>
                        <input
                            type="text"
                            value={expectedPartnerAge}
                            onChange={(e) => setExpectedPartnerAge(e.target.value)}
                            id="expected_partner_age"
                            name="expected_partner_age"
                            className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary"
                            placeholder="Expected Partner Age"
                            required
                        />
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="expected_partner_height" className="mb-2 text-[12px] dark:text-Description2">Expected Partner Height</label>
                        <input
                            type="text"
                            value={expectedPartnerHeight}
                            onChange={(e) => setExpectedPartnerHeight(e.target.value)}
                            id="expected_partner_height"
                            name="expected_partner_height"
                            className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary"
                            placeholder="e.g., 170"
                            required
                        />
                        <span className="text-xs text-gray-500">cm</span>
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="expected_partner_weight" className="mb-2 text-[12px] dark:text-Description2">Expected Partner Weight</label>
                        <input
                            type="text"
                            value={expectedPartnerWeight}
                            onChange={(e) => setExpectedPartnerWeight(e.target.value)}
                            id="expected_partner_weight"
                            name="expected_partner_weight"
                            className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary"
                            placeholder="e.g., 70"
                            required
                        />
                        <span className="text-xs text-gray-500">kg</span>
                    </div>
                </div>

                <div className='flex md:flex-row flex-col md:gap-12  '>

                    <div className="mt-4 w-full">
                        <label htmlFor="contact_email" className="mb-2 text-[12px] dark:text-Description2">Contact Email</label>
                        <input type="text" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} id="contact_email" name="contact_email" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" readOnly placeholder="Contact Email" required />
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="phone" className="mb-2 text-[12px] dark:text-Description2">Phone</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" name="phone" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Phone" required />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="dateOfBirth" className="mb-2 text-[12px] dark:text-Description2 ">Date Of Birth </label>
                        </div>
                        <DatePicker className='focus:outline-none rounded-lg px-4 py-2 mt-2 dark:text-heading2 placeholder:text-sm bg-transparent border border-primary' selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)} />
                    </div>
                </div>
                <div className='mt-4'>
                    <label className=' mb-2 text-[12px] dark:text-Description2  '>About</label>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Write a description about this Job' className='border border-primary px-6 mt-2 py-[10px] rounded-md focus:outline-none w-full bg-transparent text-primary' name="" id="" cols="30" rows="3"></textarea>
                </div>
                <div className="mt-4">
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg">Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditBioData;
