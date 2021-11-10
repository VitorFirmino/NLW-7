defmodule Elixer.Repo do
  use Ecto.Repo,
    otp_app: :elixer,
    adapter: Ecto.Adapters.Postgres
end
