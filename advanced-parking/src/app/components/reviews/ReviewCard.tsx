import React from 'react'
import Avatar from 'react-avatar'



const ReviewCard = ({ userName, userImage, message }: { userName: string, userImage: string, message: string }) => {
	return (
		<li>
			<figure className='relative rounded-2xl bg-ghostwhite dark:bg-gray-500 p-6 shadow-xl shadow-silver/80 flex flex-col gap-y-2 sm:gap-y-1 min-w-80'>
				<svg aria-hidden='true' width='105' height='78' className='absolute left-6 top-6 fill-yaleblue/20'>
					<path d='M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z'></path>
				</svg>
				<blockquote className='relative'>
					<p className='text-lg tracking-tight text-erieblack dark:text-ghostwhite font-light text-pretty'>{message}</p>
				</blockquote>
				<figcaption className='relative mt-6 flex items-center justify-between border-t border-yaleblue/30 pt-6'>
					<div>
						<div className='font-bold text-base text-erieblack dark:text-ghostwhite'>{userName}</div>
					</div>
					<div className='overflow-hidden rounded-full bg-silver'>
					
						{userImage ? (<Avatar name={userName} size='40' round color='#063971' src={userImage} maxInitials={2} />
						) : (
							<Avatar size='40' round src='/profile-picture-blank.webp' />
						)}
					</div>
				</figcaption>
			</figure>
		</li>
	)
}

export default ReviewCard
