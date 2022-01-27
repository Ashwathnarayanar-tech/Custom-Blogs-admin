export async function makeAPICall(appURL, method, reqData) {
    if (method == "GET") {
      try {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        // header.append("Content-Type", "multipart/form-data");
        // header.append("Content-Type", "image/png");
        header.append(
          "Access-Control-Allow-Methods",
          "GET, OPTIONS, POST, PUT,DELETE"
        );
        const response = await fetch(appURL, {
          mode: "cors",
          credentials: "include",
          method: method,
          headers: header,
        });
        let data = await response.json();
          console.log( "attach",response);
        return data;
      } catch (e) {
        console.log(e);
      }
    } else if (method == "POST") {
      try {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Accept", "application/vnd.vtex.ds.v10+json");
        header.append("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
        const response = await fetch(appURL, {
          mode: "cors",
          credentials: "include",
          method: method,
          headers: header,
          body: JSON.stringify(reqData),
        });
        let data = await response.json();
        //   console.log({ data });
        return data;
      } catch (e) {
        console.log(e);
      }
    } else if (method == "PUT") {
      try {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Accept", "application/vnd.vtex.ds.v10+json");
        header.append("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
        const response = await fetch(appURL, {
          mode: "cors",
          credentials: "include",
          method: method,
          headers: header,
          body: JSON.stringify(reqData),
        });
        return response;
      } catch (e) {
        console.log(e);
      }
    } else if (method == "DELETE") {
      try {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Accept", "application/vnd.vtex.ds.v10+json");
        header.append("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
        const response = await fetch(appURL, {
          mode: "cors",
          credentials: "include",
          method: method,
          headers: header,
        });
        return response;
      } catch (e) {
        console.log(e);
      }
    } else {
      /* Do Nothing */
    }
  }
  