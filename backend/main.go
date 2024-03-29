package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	r.Post("/api/image", func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.Body)
		log.Println(r.Header)
	})

	http.ListenAndServe(":42069", r)
}
