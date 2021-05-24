# frozen_string_literal: true

# Global helper
module ApplicationHelper
  # use later
  def readable_time(created_at)
    created_at = adjust_timezone(created_at)
    now = adjust_timezone(Time.now)
    if created_at.day == now.day
      today(now, created_at)
    elsif created_at.year == now.year
      same_year(created_at)
    else # long ago
      long_ago(created_at)
    end
  end

  private

  def adjust_timezone(time)
    timezone = I18n.locale == :en ? 'UTC' : 'Taipei'
    time.in_time_zone(timezone)
  end

  def today(now, created_at)
    if now.hour == created_at.hour # created within 1 hour
      I18n.t('time.formats.today.minutes_ago', minutes: (now.min - created_at.min).abs)
    else
      I18n.t('time.formats.today.hours_ago', hours: (now.hour - created_at.hour).abs)
    end
  end

  def same_year(created_at)
    I18n.t(
      'time.formats.same_year',
      month: I18n.locale == :en ? I18n.t('date.abbr_month_names')[created_at.month] : created_at.month,
      day: created_at.day
    )
  end

  def long_ago(created_at)
    I18n.t(
      'time.formats.long_ago',
      year: created_at.year,
      month: I18n.locale == :en ? I18n.t('date.abbr_month_names')[created_at.month] : created_at.month,
      day: created_at.day
    )
  end
end
