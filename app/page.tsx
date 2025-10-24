"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { TypingText } from "@/components/typing-text"

interface Product {
  id: string
  name: string
  category: string
  description: string
  price: string
  vendor: string
  url: string
}

interface ApiResponse {
  summary?: string
  error?: string
}

interface RecommendationsResponse {
  recommendations?: Product[]
  error?: string
}

export default function Home() {
  const [query, setQuery] = useState("")
  const [summary, setSummary] = useState("")
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [allProducts, setAllProducts] = useState<Product[]>([])

  const BACKEND_URL = "https://ai-backend.deepdev.co.in"

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError("")
    setSummary("")
    setRecommendations([])

    try {

      // Fetch all available products after recommendations
      const allResponse = await fetch(`${BACKEND_URL}/products`)
      const allData: { products?: Product[]; error?: string } = await allResponse.json()

      if (!allResponse.ok) {
        throw new Error(allData.error || "Failed to fetch all products")
      }

      setAllProducts(allData.products || [])

      const overviewResponse = await fetch(`${BACKEND_URL}/ai-overview?query=${encodeURIComponent(query)}`)
      const overviewData: ApiResponse = await overviewResponse.json()

      if (!overviewResponse.ok) {
        throw new Error(overviewData.error || "Failed to fetch AI overview")
      }

      setSummary(overviewData.summary || "")

      // Fetch Recommendations
      const recsResponse = await fetch(`${BACKEND_URL}/recommendations?query=${encodeURIComponent(query)}`)
      const recsData: RecommendationsResponse = await recsResponse.json()

      if (!recsResponse.ok) {
        throw new Error(recsData.error || "Failed to fetch recommendations")
      }

      setRecommendations(recsData.recommendations || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">Jasify AI Marketplace</h1>
          <p className="text-lg text-muted-foreground">Discover AI tools and get personalized recommendations</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Search AI Products</CardTitle>
            <CardDescription>
              Enter what you're looking for and get AI-powered insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g., 'I need help with content creation' or 'AI for business automation'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="px-6">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <p className="text-destructive font-medium">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* AI Overview */}
        {summary && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">AI Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <TypingText text={summary} speed={30} />
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Recommended Products ({recommendations.length})</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {recommendations.map((product) => (
                <Card key={product.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="mt-1">{product.category}</CardDescription>
                      </div>
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                        {product.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-foreground">{product.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground">by {product.vendor}</span>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Visit →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}


        {allProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              All Products ({allProducts.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {allProducts.map((product) => (
                <Card key={product.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="mt-1">{product.category}</CardDescription>
                      </div>
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                        {product.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-foreground">{product.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground">by {product.vendor}</span>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Visit →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}


        {/* Empty State */}
        {!loading && !summary && recommendations.length === 0 && !error && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-2">Start by searching for an AI tool or capability you need</p>
              <p className="text-sm text-muted-foreground">
                Examples: "content creation", "business automation", "customer support"
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
