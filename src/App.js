import { useEffect, useState } from "react";
import { ChartInfo } from "./Chart";
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://bnwjefziktrpjkkaxeuh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJud2plZnppa3RycGpra2F4ZXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3ODg4NTMsImV4cCI6MTk4OTM2NDg1M30.yAsb7nRdWPS0MQQV4y4QTFysLLVVbH7XR1AVXkW3dDM";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [mydata, setmyData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data: scrapedData, error } = await supabase
        .from("scraped data")
        .select("*");

      setmyData(scrapedData);
    };
    getData();
  }, []);
  // supabase

  return (
    <div className="App">
      {mydata.length ? <ChartInfo data={mydata} /> : ""}
    </div>
  );
}

export default App;
