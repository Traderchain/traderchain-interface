
export async function request(options: any) {
  const {url, headers} = options;
  const opts: any = {};
  if (headers)  opts.headers = headers;
  const response = await fetch(url, opts);
  return await response.json();
}

export async function requestSystemT(options: any) {  
  options.url = `${process.env.SYSTEM_T_API}/${options.url}`;
  options.headers = { 
    cookie: `_sid=${process.env.SYSTEM_T_SID}`,
    'user-agent': 'Traderchain'
  };
  return await request(options);
}
