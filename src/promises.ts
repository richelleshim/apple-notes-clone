// wait for server request
// get response server request
// normal

// await 


const request = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(5)
    }, 1000);
  });
};

export const func = async () => {
  const num = await request()
  console.log(num)
};

func()