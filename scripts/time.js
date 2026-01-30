
setInterval(() => {
  const date = new Date();
  const dateNum = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
}, 1000)