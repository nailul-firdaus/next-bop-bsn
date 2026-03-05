import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function InputSearchbar() {
  return (
    <div className="flex w-full items-stretch drop-shadow-sm">
      <Select defaultValue="transaction_id">
        <SelectTrigger className="w-38 h-11 rounded-lg rounded-r-none border-0 bg-primary text-white hover:bg-primary/90 focus:ring-0 focus:ring-offset-0 focus:bg-primary font-medium [&>svg]:text-white! [&>svg]:opacity-100! [&_svg]:stroke-[3px]!">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="transaction_id">Transaction Id</SelectItem>
            <SelectItem value="customer_name">Customer Name</SelectItem>
            <SelectItem value="account_number">Account Number</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search..."
          className="h-11 w-full rounded-lg rounded-l-none border-gray-100 border-l-0 bg-white pl-4 pr-11 text-base placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-0 focus-visible:border-gray-400"
        />
        <Search
          className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300"
          strokeWidth={3}
        />
      </div>
    </div>
  );
}
