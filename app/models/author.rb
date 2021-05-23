class Author < ApplicationRecord
  include BCrypt
  enum role: %i[normal admin]

  def password=(new_password)
    self.password_hash = Password.create(new_password)
  end

  def valid_password?(check_password)
    password == check_password
  end

  private

  def password
    password_hash ? Password.new(password_hash) : ''
  end
end
