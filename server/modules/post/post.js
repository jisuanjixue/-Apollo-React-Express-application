const posts = [
    {
      id: '1',
      title: 'Maurice',
      content: '好样的',
    },
    {
      id: '2',
      title: '不是双方',
      content: '好样的三扥放过',
    }
  ];
  
  export default {
    getPosts: () => posts,
    addPost: (post) => posts.push(post),
  };