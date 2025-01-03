import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { motion } from 'motion/react';
import { useCreateLike } from '@/hooks/apis/Likes/useCreateLikeQuery';
import { useDeleteLike } from '@/hooks/apis/Likes/useDeleteLikeQuery';

interface PostLikeProps {
  completeId: number;
  likeStatus: boolean;
  likeCount: number;
}

export function PostLike({ completeId, likeStatus, likeCount }: PostLikeProps) {
  const { mutate: createLike } = useCreateLike();
  const { mutate: deleteLike } = useDeleteLike();

  const handleClickLike = () => {
    if (likeStatus) {
      deleteLike(completeId);
    } else {
      createLike(completeId);
    }
  };

  return (
    <div className="flex items-center">
      <motion.div
        className="ml-16 mr-12 size-22 cursor-pointer"
        onClick={handleClickLike}
        whileTap={{ scale: 1.0 }}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {likeStatus ? (
          <FaHeart className="size-22 fill-sub-pink" />
        ) : (
          <FaRegHeart className="size-22" />
        )}
      </motion.div>
      <div className="text-sm-normal text-custom-gray-200">{likeCount}</div>
    </div>
  );
}