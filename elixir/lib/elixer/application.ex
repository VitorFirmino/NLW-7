defmodule Elixer.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Elixer.Repo,
      # Start the Telemetry supervisor
      ElixerWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Elixer.PubSub},
      # Start the Endpoint (http/https)
      ElixerWeb.Endpoint,
      # Start a worker by calling: Elixer.Worker.start_link(arg)
      # {Elixer.Worker, arg}
      Elixer.Scheduler
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Elixer.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ElixerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
