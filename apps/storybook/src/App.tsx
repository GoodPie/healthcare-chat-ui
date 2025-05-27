import {MessageBubble} from "@healthcare-chat/ui";

function App() {

  return (
    <>
      <div className={"bg-red-500"}>
        <MessageBubble message={"Hello World"} timestamp={new Date} />
      </div>
    </>
  )
}

export default App
