import { GetFollowsResponse } from '@/types/Follows';

export const generateMockFollowPosts = (
  cursor: number,
  size: number,
): GetFollowsResponse => {
  const totalItems = 30;
  const startId = cursor || 0;
  const endId = Math.min(startId + size, totalItems);

  const content = Array.from({ length: endId - startId }, (_, i) => {
    const id = startId + i + 1;

    return {
      userId: id,
      completeId: id + 1000,
      completePic: `https://picsum.photos/id/${id + 100}/300/500`,
      completeContent: `Mock 게시글 내용 ${id}`,
      profilePic: '',
      username: `유저${id}`,
      createdAt: new Date().toISOString(),
      likeStatus: id % 2 === 0,
      likeCount: Math.floor(Math.random() * 100),
      commentCount: Math.floor(Math.random() * 20),
    };
  });

  const hasMore = endId < totalItems;

  return {
    statusCode: 200,
    timestamp: new Date().toISOString(),
    data: {
      content,
      empty: content.length === 0,
      first: startId === 0,
      last: !hasMore,
      nextCursor: hasMore ? endId : 0,
      number: startId / size,
      numberOfElement: content.length,
      pageable: {
        offset: startId,
        pageNumber: startId / size,
        paged: true,
        sort: { empty: true, sorted: false, unsorted: true },
        unpaged: false,
      },
      size,
      sort: { empty: true, sorted: false, unsorted: true },
    },
  };
};
