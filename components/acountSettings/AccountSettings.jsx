import React, { useState } from 'react';
import Header from '../Header';
import { useSession } from 'next-auth/react';
import { BsFillPersonFill } from 'react-icons/bs';
import UpdateInfoModal from './components/UpdateInfoModal';
import Toaster from '../generic/Toaster';

const defaultErrorState = {
	error: false,
	errorMessage: '',
};
const defaultSuccessState = {
	success: false,
	successMessage: '',
};

const AccountSettings = () => {
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [updateError, setUpdateError] = useState(defaultErrorState);
	const [updateSuccess, setUpdateSuccess] = useState(defaultSuccessState);

	const { data: session, status } = useSession();

	function closeModalHandler() {
		setShowModal(false);
	}

	async function updateUserInfo(newName, newPassword) {
		//ADD LOADING SPINNER
		setIsLoading(true);

		// === CLEAR ANY PREVIOUS ERRORS ===
		setUpdateError({ error: false, errorMessage: '' });
		setUpdateSuccess({ success: false, successMessage: '' });

		// === API CALL
		const response = await fetch('/api/editinfo', {
			method: 'PATCH',
			body: JSON.stringify({ newName, newPassword }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.message || 'Something went wrong');
		}

		return data;
	}

	async function confirmModalHandler(newName, newPassword) {
		// TRY TO SEND DATA TO DB
		try {
			const result = await updateUserInfo(newName, newPassword);
			setUpdateSuccess({
				success: true,
				successMessage: 'Details updated successfully',
			});
			closeModalHandler();
			setIsLoading(false);
		} catch (error) {
			//==THROW ERRORS ON THE UI ===
			setUpdateError({
				error: true,
				errorMessage: error.message || 'Something went wrong',
			});
			setIsLoading(false);
		}
	}

	return (
		<div className="bg-gray-100 min-h-screen">
			<Header message={'Account info'} />
			<div className="flex flex-col justify-start items-center w-[88%] md:w-2/5 max-w-4xl mx-auto mt-5 align-middle h-[550px] border rounded-lg border-gray-300 bg-white">
				{/* <div className="border-gray-700 border rounded-full mb-3"> */}
				<BsFillPersonFill
					size={150}
					className="text-cyan-800 p-1 opacity-75 shadow-cyan-800 shadow-lg rounded-full mb-10 mt-4"
				/>
				{/* </div> */}
				<div className="flex flex-col items-start">
					<div className="flex justify-start items-center mb-6">
						<p className="text-md">Name:</p>
						<p className=" p-2">{session?.user?.name || ''}</p>
					</div>

					<div className="flex justify-start items-center mb-6">
						<p className="text-md">E-mail:</p>
						<p className=" p-2">{session?.user?.email || ''}</p>
					</div>

					{updateSuccess.success && (
						<p className="text-sm text-green-500 bg-green-100 p-2 mb-5 border rounded-lg">
							{updateSuccess.successMessage}
						</p>
					)}
				</div>

				<button
					className="text-md text-black border rounded-lg p-2 mt-10 bg-cyan-500 hover:bg-cyan-700 hover:text-white  uppercase"
					onClick={() => setShowModal(true)}
				>
					Edit info
				</button>
			</div>
			{showModal && (
				<UpdateInfoModal
					isLoading={isLoading}
					onClose={closeModalHandler}
					onConfirm={confirmModalHandler}
					updateError={updateError}
				/>
			)}

			{updateSuccess.success && (
				<Toaster
					title={updateSuccess.successMessage}
					status={'✅'}
					color={'green'}
				/>
			)}
		</div>
	);
};

export default AccountSettings;
