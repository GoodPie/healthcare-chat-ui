import "./App.css"
// import "./components/ui/styles/index.css"
import {MessageBubble} from "./components/ui/message-bubble/message-bubble";



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
