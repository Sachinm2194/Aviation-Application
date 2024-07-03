using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Aviation_Application.Models;

public partial class AviationContext : DbContext
{
    public AviationContext()
    {
    }

    public AviationContext(DbContextOptions<AviationContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<AirlineBooking> AirlineBookings { get; set; }

    public virtual DbSet<FullAirlinesSchedule> FullAirlinesSchedules { get; set; }

    public virtual DbSet<InternationalAirline> InternationalAirlines { get; set; }

    public virtual DbSet<InternationalAirlinesSchedule> InternationalAirlinesSchedules { get; set; }

    public virtual DbSet<InternationalAirport> InternationalAirports { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserDetail> UserDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(" Data Source=LAPTOP-EMR04HL2\\SQLEXPRESS;Initial Catalog=Aviation;Integrated Security=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PK__Admins__C9F28457F1E47BD2");

            entity.Property(e => e.UserName).HasMaxLength(250);
            entity.Property(e => e.Email).HasMaxLength(300);
            entity.Property(e => e.Password).HasMaxLength(200);
            entity.Property(e => e.UserId)
                .ValueGeneratedOnAdd()
                .HasColumnName("UserID");
        });

        modelBuilder.Entity<AirlineBooking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PK__AirlineB__73951ACDE7AE826C");

            entity.Property(e => e.BookingId).HasColumnName("BookingID");
            entity.Property(e => e.ArrivalAirport)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ArrivalAirportName)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.ArrivalTime).HasMaxLength(10);
            entity.Property(e => e.BookingClass)
                .HasMaxLength(30)
                .HasDefaultValue("Economy");
            entity.Property(e => e.DepartureAirport)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DepartureAirportName)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.DepartureTime).HasMaxLength(10);
            entity.Property(e => e.EmailId).HasColumnName("EmailID");
            entity.Property(e => e.FlightId).HasColumnName("FlightID");
            entity.Property(e => e.FlightNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.IsCancelled).HasDefaultValue(false);
            entity.Property(e => e.NumberOfTickets).HasDefaultValue(1);
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Flight).WithMany(p => p.AirlineBookings)
                .HasForeignKey(d => d.FlightId)
                .HasConstraintName("F_FlightID");
        });

        modelBuilder.Entity<FullAirlinesSchedule>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("FullAirlinesSchedules");

            entity.Property(e => e.AirlineName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ArrivalAirport)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ArrivalAirportName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ArrivalCountry)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ArrivalTime).HasMaxLength(10);
            entity.Property(e => e.DepartureAirport)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DepartureAirportName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DepartureCountry)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DepartureTime).HasMaxLength(10);
            entity.Property(e => e.FlightId).HasColumnName("FlightID");
            entity.Property(e => e.FlightNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<InternationalAirline>(entity =>
        {
            entity.HasKey(e => e.FlightNumber).HasName("PK__Internat__2EAE6F51CB4057EB");

            entity.Property(e => e.FlightNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AirlineName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Details)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID");
        });

        modelBuilder.Entity<InternationalAirlinesSchedule>(entity =>
        {
            entity.HasKey(e => e.FlightId).HasName("PK__Internat__8A9E148E3C08A5CF");

            entity.ToTable(tb => tb.HasTrigger("trg_FlightCancellation"));

            entity.Property(e => e.FlightId).HasColumnName("FlightID");
            entity.Property(e => e.ArrivalAirport)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ArrivalTime).HasMaxLength(10);
            entity.Property(e => e.DepartureAirport)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DepartureTime).HasMaxLength(10);
            entity.Property(e => e.FlightNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.IsCancelled).HasDefaultValue(false);

            entity.HasOne(d => d.FlightNumberNavigation).WithMany(p => p.InternationalAirlinesSchedules)
                .HasForeignKey(d => d.FlightNumber)
                .HasConstraintName("fk_flight");
        });

        modelBuilder.Entity<InternationalAirport>(entity =>
        {
            entity.HasKey(e => e.AirportCode).HasName("PK__Internat__4B677352E465265C");

            entity.Property(e => e.AirportCode)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.AirportId)
                .ValueGeneratedOnAdd()
                .HasColumnName("AirportID");
            entity.Property(e => e.AirportName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Country)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CountryCode)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Iataregion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("IATARegion");
            entity.Property(e => e.Latitude).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.TimeZone)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PK__Notifica__20CF2E32BFF1278F");

            entity.Property(e => e.NotificationId).HasColumnName("NotificationID");
            entity.Property(e => e.Message).HasMaxLength(255);
            entity.Property(e => e.NotificationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C3A8BAEBC");

            entity.Property(e => e.UserId).ValueGeneratedNever();
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserDetail>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserDeta__1788CCAC4D311C19");

            entity.HasIndex(e => e.EmailId, "UQ__UserDeta__7ED91AEEE59A416D").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.AcoountCreated).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Dob).HasColumnName("DOB");
            entity.Property(e => e.EmailId)
                .HasMaxLength(200)
                .HasColumnName("EmailID");
            entity.Property(e => e.FirstName).HasMaxLength(200);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.LastName).HasMaxLength(200);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
