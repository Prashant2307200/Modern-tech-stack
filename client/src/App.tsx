import './App.css'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Car } from 'lucide-react';
import { useEffect, useState } from 'react';

function App() {

  const [totalSpent,setTotalSpent] = useState(0);

  useEffect(() => {
    (async function fetchData(){
      const data = await fetch("/api/expenses/total-spent");
      const { total } = await data.json();
      setTotalSpent(total);
    })();
  }, []);

  return (
    <Card className='w-[350px] m-auto text-left'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  );
}

export default App
