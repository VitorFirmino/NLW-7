defmodule ElixerWeb.MessagesView do
  use ElixerWeb, :view

  def render("create.json", %{message: message}) do
    %{
      result: "Message created!",
      message: message
    }
  end
end
