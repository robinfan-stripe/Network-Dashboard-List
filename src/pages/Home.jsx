import { useState } from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input, { Select, Textarea } from '../components/Input';
import Table from '../components/Table';
import Toggle from '../components/Toggle';
import ToggleCard, { ToggleCardGroup } from '../components/ToggleCard';
import Tooltip from '../components/Tooltip';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [textareaValue, setTextareaValue] = useState('');
  const [toggleChecked, setToggleChecked] = useState(false);
  const [selectedCard, setSelectedCard] = useState('card1');

  // Sample data for table
  const tableColumns = [
    { key: 'name', header: 'Name', width: 'grow' },
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Status', render: (item) => (
      <Badge variant={item.status === 'Active' ? 'success' : 'default'}>{item.status}</Badge>
    )},
    { key: 'amount', header: 'Amount', align: 'right' },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', amount: '$1,234.00' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', amount: '$567.00' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Active', amount: '$890.00' },
  ];

  return (
    <div className="p-8 space-y-12">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Component Examples</h1>
        <p className="text-gray-500">Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/pages/Home.jsx</code> to edit this page.</p>
      </div>

      {/* Badges */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Badge</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
        <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
{`<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>`}
        </pre>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
          <Button icon="add">With Icon</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
        <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
{`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button disabled>Disabled</Button>
<Button icon="add">With Icon</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>`}
        </pre>
      </section>

      {/* Input */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Input</h2>
        <div className="max-w-md space-y-4">
          <Input
            placeholder="Basic input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            placeholder="With prefix"
            prefix="$"
            value=""
            onChange={() => {}}
          />
          <Input
            placeholder="With suffix"
            suffix="USD"
            value=""
            onChange={() => {}}
          />
          <Input
            placeholder="With error"
            error
            errorMessage="This field is required"
            value=""
            onChange={() => {}}
          />
          <Input
            placeholder="Disabled"
            disabled
            value=""
            onChange={() => {}}
          />
        </div>
        <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
{`<Input placeholder="Basic input" value={value} onChange={...} />
<Input placeholder="With prefix" prefix="$" />
<Input placeholder="With suffix" suffix="USD" />
<Input placeholder="With error" error errorMessage="This field is required" />
<Input placeholder="Disabled" disabled />`}
        </pre>
      </section>

      {/* Select */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Select</h2>
        <div className="max-w-md">
          <Select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
{`<Select value={value} onChange={...}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>`}
        </pre>
      </section>

      {/* Textarea */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Textarea</h2>
        <div className="max-w-md">
          <Textarea
            placeholder="Enter your message..."
            rows={3}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
        </div>
        <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
{`<Textarea placeholder="Enter your message..." rows={3} value={value} onChange={...} />`}
        </pre>
      </section>

      {/* Toggle */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Toggle</h2>
        <div className="space-y-3">
          <Toggle
            checked={toggleChecked}
            onChange={(e) => setToggleChecked(e.target.checked)}
            label="Enable notifications"
          />
          <Toggle
            checked={true}
            onChange={() => {}}
            label="Always on"
          />
          <Toggle
            checked={false}
            onChange={() => {}}
            disabled
            label="Disabled toggle"
          />
        </div>
        <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
{`<Toggle checked={checked} onChange={...} label="Enable notifications" />
<Toggle checked={true} label="Always on" />
<Toggle checked={false} disabled label="Disabled toggle" />`}
        </pre>
      </section>

      {/* ToggleCard */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">ToggleCard</h2>
        <div className="max-w-md">
          <ToggleCardGroup label="Select an option">
            <ToggleCard
              title="Option A"
              description="This is the first option"
              selected={selectedCard === 'card1'}
              onClick={() => setSelectedCard('card1')}
            />
            <ToggleCard
              title="Option B"
              description="This is the second option"
              selected={selectedCard === 'card2'}
              onClick={() => setSelectedCard('card2')}
            />
          </ToggleCardGroup>
        </div>
        <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
{`<ToggleCardGroup label="Select an option">
  <ToggleCard
    title="Option A"
    description="This is the first option"
    selected={selected === 'card1'}
    onClick={() => setSelected('card1')}
  />
  <ToggleCard
    title="Option B"
    description="This is the second option"
    selected={selected === 'card2'}
    onClick={() => setSelected('card2')}
  />
</ToggleCardGroup>`}
        </pre>
      </section>

      {/* Tooltip */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tooltip</h2>
        <div className="flex flex-wrap gap-6">
          <Tooltip content="This is a tooltip on top" placement="top">
            <Button variant="secondary">Hover me (top)</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip on bottom" placement="bottom">
            <Button variant="secondary">Hover me (bottom)</Button>
          </Tooltip>
          <Tooltip content="Minimal style" placement="top" variant="minimal">
            <Button variant="secondary">Minimal tooltip</Button>
          </Tooltip>
        </div>
        <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
{`<Tooltip content="This is a tooltip" placement="top">
  <Button>Hover me</Button>
</Tooltip>
<Tooltip content="Minimal style" variant="minimal">
  <Button>Minimal tooltip</Button>
</Tooltip>`}
        </pre>
      </section>

      {/* Table */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Table</h2>
        <Table
          columns={tableColumns}
          data={tableData}
          onRowClick={(item) => alert(`Clicked: ${item.name}`)}
          mobileRow={(item, onClick) => (
            <div
              className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={onClick}
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">{item.email}</div>
              <div className="flex justify-between mt-2">
                <Badge variant={item.status === 'Active' ? 'success' : 'default'}>{item.status}</Badge>
                <span className="font-medium">{item.amount}</span>
              </div>
            </div>
          )}
        />
        <pre className="mt-3 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
{`const columns = [
  { key: 'name', header: 'Name', width: 'grow' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status', render: (item) => <Badge>{item.status}</Badge> },
  { key: 'amount', header: 'Amount', align: 'right' },
];

<Table
  columns={columns}
  data={data}
  onRowClick={(item) => console.log(item)}
  mobileRow={(item, onClick) => (
    <div onClick={onClick}>...</div>
  )}
/>`}
        </pre>
      </section>
    </div>
  );
}
