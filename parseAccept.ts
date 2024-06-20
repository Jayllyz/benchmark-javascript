// parseAccept.ts

export interface Accept {
    type: string;
    params: { [key: string]: string };
    q: number;
  }
  
  // Solution 1 : without spread operator
  export const parseAccept1 = (acceptHeader: string): Accept[] => {
    const accepts = acceptHeader.split(',');
    return accepts.map((accept) => {
      const [type, ...params] = accept.trim().split(';');
      const q = params.find((param) => param.startsWith('q='));
      return {
        type,
        params: params.reduce((acc, param) => {
          const [key, value] = param.split('=');
          return { ...acc, [key.trim()]: value.trim() };
        }, {}),
        q: q ? parseFloat(q.split('=')[1]) : 1,
      };
    });
  };
  
 // Solution 2 : with spread operator
  export const parseAccept2 = (acceptHeader: string): Accept[] => {
    const accepts = acceptHeader.split(',');
    return accepts.map((accept) => {
      const parts = accept.trim().split(';');
      const type = parts[0];
      const params = parts.slice(1);
      const qParam = params.find((param) => param.startsWith('q='));
  
      const paramsObject = params.reduce((acc, param) => {
        const keyValue = param.split('=');
        const key = keyValue[0].trim();
        const value = keyValue[1].trim();
        acc[key] = value;
        return acc;
      }, {} as { [key: string]: string });
  
      return {
        type: type,
        params: paramsObject,
        q: qParam ? parseFloat(qParam.split('=')[1]) : 1,
      };
    });
  };
  